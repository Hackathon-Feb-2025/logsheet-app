package com.etms.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etms.dtos.LogsheetDTO;
import com.etms.pojos.Courses;
import com.etms.pojos.Employee;
import com.etms.pojos.LogType;
import com.etms.pojos.Logsheet;
import com.etms.pojos.Modules;
import com.etms.pojos.Schedules;
import com.etms.repository.CourseRepository;
import com.etms.repository.LogSheetRepository;
import com.etms.repository.ModuleRepository;
import com.etms.repository.PersonRepository;
import com.etms.repository.ScheduleRepository;

@Service
public class CurriculumService {
    
	@Autowired
    private  LogSheetRepository logSheetRepository;
	@Autowired
	private ScheduleRepository scheduleRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private ModuleRepository moduleRepository;
	@Autowired
	private PersonRepository personRepository;
	@Autowired
	private ModelMapper mapper;
	

    
    private static final String BASE_PATH = "src/main/resources/"; // Base directory for manually added curriculum files

    public Map<String, List<String>> getCurriculumTopics(String moduleName) {
        Map<String, List<String>> curriculumMap = new LinkedHashMap<>();
        String currentTopic = null;
        
        String filePath = BASE_PATH + moduleName.toLowerCase() + ".txt"; // Construct file path dynamically

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (!line.isEmpty()) {
                    if (!line.startsWith("-")) {
                        // It's a main topic
                        currentTopic = line;
                        curriculumMap.put(currentTopic, new ArrayList<>());
                    } else if (currentTopic != null) {
                        // It's a subtopic
                        curriculumMap.get(currentTopic).add(line.substring(1).trim());
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading curriculum file: " + filePath, e);
        }

        return curriculumMap;
    }

    public boolean isValidTopic(String moduleName, String topic) {
        return getCurriculumTopics(moduleName).values().stream()
                .anyMatch(list -> list.contains(topic));
    }
    

    public Logsheet saveLogEntry(LogsheetDTO logSheetDTO) {
    	 if (logSheetDTO.getType() == "Lab" && logSheetDTO.getTopicsTaught() != null && !logSheetDTO.getTopicsTaught().isEmpty()) {
             throw new IllegalArgumentException("TopicsTaught should be empty when type is LAB.");
         }
        Logsheet logSheet =mapper.map(logSheetDTO, Logsheet.class);
          Schedules s= scheduleRepository.findById(logSheetDTO.getScheduleId()).orElseThrow();
          Courses c=courseRepository.findById(logSheetDTO.getCourseId()).orElseThrow();
          Modules m=moduleRepository.findById(logSheetDTO.getModuleId()).orElseThrow();
          Employee e=personRepository.findById(logSheetDTO.getFacultyId()) .orElseThrow();  
          
                    
         logSheet.setCourse(c);
         logSheet.setModule(m);
         logSheet.setSchedule(s);
         logSheet.setFaculty(e);
         
       
//        logSheet.setDate(logSheetDTO.getDate());
//        logSheet.setStart_time(logSheetDTO.getStartTime());
//        logSheet.setEnd_time(logSheetDTO.getEndTime());
//       
//       
//        logSheet.setTopicsTaught(logSheetDTO.getTopicsTaught());
//        logSheet.setAssignmentGiven(logSheetDTO.getAssignmentGiven());
//        logSheet.setStudentProgress(logSheetDTO.getStudentProgress());
        
       
        return logSheetRepository.save(logSheet);
    }
//    public Logsheet saveLogsheet(LogsheetDTO logsheetDTO) {
//        if (logsheetDTO.getType() == LogType.LAB && logsheetDTO.getTopicsTaught() != null && !logsheetDTO.getTopicsTaught().isEmpty()) {
//            throw new IllegalArgumentException("TopicsTaught should be empty when type is LAB.");
//        }
//
//        // Convert DTO to Entity and save
//        Logsheet logsheet = new Logsheet();
//        logsheet.setDate(logsheetDTO.getDate());
//        logsheet.setStart_time(logsheetDTO.gettart_time());
//        logsheet.setEnd_time(logsheetDTO.getEnd_time());
//        logsheet.setType(logsheetDTO.getType());
//        logsheet.setTopicsTaught(logsheetDTO.getTopicsTaught());
//        logsheet.setAssignmentGiven(logsheetDTO.getAssignmentGiven());
//        logsheet.setStudentProgress(logsheetDTO.getStudentProgress());
//
//        return logsheetRepository.save(logsheet);
//    }
}
