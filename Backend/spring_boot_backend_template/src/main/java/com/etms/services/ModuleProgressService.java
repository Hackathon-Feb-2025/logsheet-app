package com.etms.services;

import com.etms.pojos.Courses;
import com.etms.pojos.Employee;
import com.etms.pojos.Logsheet;
import com.etms.pojos.Modules;
import com.etms.repository.LogSheetRepository;
import com.etms.repository.CourseRepository;
import com.etms.repository.ModuleRepository;
import com.etms.repository.PersonRepository;
import com.etms.dto.ModuleProgressReportDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;


@Service
public class ModuleProgressService {
    @Autowired
    private LogSheetRepository logsheetRepository;
    
    @Autowired
    private CourseRepository coursesRepository;
    
    @Autowired
    private ModuleRepository modulesRepository;
    
    @Autowired
    private PersonRepository employeeRepository;
    
    public ModuleProgressReportDTO generateReport(String courseName, String moduleName, String facultyName) {
        // Fetch Course, Module, and Faculty from Database
        Courses course = coursesRepository.findByCourseName(courseName)
                .orElseThrow(() -> new RuntimeException("Course not found: " + courseName));
        
        Modules module = modulesRepository.findByModuleName(moduleName)
                .orElseThrow(() -> new RuntimeException("Module not found: " + moduleName));

        Employee faculty = employeeRepository.findByFirstName(facultyName)
                .orElseThrow(() -> new RuntimeException("Faculty not found: " + facultyName));

        // Fetch Logsheet entries
        List<Logsheet> logs = logsheetRepository.findByCourseAndModuleAndFaculty(course, module, faculty);

        // Extract Unique Topics Taught
        Set<String> topicsTaught = logs.stream()
                .flatMap(log -> Optional.ofNullable(log.getTopicsTaught()).stream().flatMap(List::stream)) 
                .collect(Collectors.toSet());


        List<Logsheet> allModuleLogs = logsheetRepository.findByModule(module);

        // ✅ Calculate Total Topics Dynamically
        int totalTopics = allModuleLogs.stream()
                .flatMap(log -> Optional.ofNullable(log.getTopicsTaught()).stream().flatMap(List::stream))
                .collect(Collectors.toSet())
                .size();
        double progressPercentage = (totalTopics == 0) ? 0 : ((double) topicsTaught.size() / totalTopics) * 100;

        return new ModuleProgressReportDTO(logs, topicsTaught.size(), totalTopics, progressPercentage);
    }
}
