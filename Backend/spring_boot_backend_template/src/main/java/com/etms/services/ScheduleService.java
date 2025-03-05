package com.etms.services;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etms.dto.AddScheduleDTO;
import com.etms.dtos.LogSheetFormDTO;
import com.etms.pojos.Courses;
import com.etms.pojos.Employee;
import com.etms.pojos.LogSheetForm;
import com.etms.pojos.Modules;
import com.etms.pojos.Schedules;
import com.etms.repository.CourseRepository;
import com.etms.repository.LogSheetFormRepository;
import com.etms.repository.ModuleRepository;
import com.etms.repository.PersonRepository;
import com.etms.repository.ScheduleRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ScheduleService {
	
	private static final String FILE_PATH = "schedules.txt";
	
	@Autowired
	private ScheduleRepository scheduleRepository;
	@Autowired
	 private ModelMapper mapper;
	@Autowired
	 private CourseRepository courseRepository;
	@Autowired
	 private ModuleRepository moduleRepository;
	@Autowired
	 private PersonRepository personRepository;
	@Autowired
	 private LogSheetFormRepository formRepository;
	
	 
	 public Schedules AddSchedules(AddScheduleDTO sdto)
	 {
		 Courses c=courseRepository.findById(sdto.getCourse()).orElseThrow();
		 Modules m=moduleRepository.findById(sdto.getModules()).orElseThrow();
		 Employee e=personRepository.findById(sdto.getFaculty_id()).orElseThrow();
		 
		 Schedules Sdto=mapper.map(sdto, Schedules.class);
		// Sdto.setScduledgroup(sdto.getScduledgroup());
		 Sdto.setModules(m);
		 Sdto.setCourse(c);
		 Sdto.setFaculty(e);
		 
		return  scheduleRepository.save(Sdto);
		//return mapper.map(s, ScheduleRespDTO.class);
		 
	 }

	

//	public Schedules getScheduleByFacultyAndDate(Long facultyId, LocalDate date) {
//		
//		Employee e=personRepository.findById(facultyId).orElseThrow(); 
//		Schedules s=scheduleRepository.findByFacultyAndDate(e,date);
//		
//		
//		return s;
//	}
	 public List<Schedules> getSchedulesByFacultyAndDate(Long facultyId, LocalDate date) {
	        Employee faculty = personRepository.findById(facultyId)
	                .orElseThrow(() -> new RuntimeException("Faculty not found"));
	        return scheduleRepository.findByFacultyAndDate(faculty, date);
	    }
	
	public void saveSchedulesToFile() {
        List<Schedules> schedules = scheduleRepository.findAll();

        try (FileWriter writer = new FileWriter(FILE_PATH)) {
            writer.write("Sr Date StartTime EndTime Type Group Module Faculty Venue\n");

            int sr = 1;
            for (Schedules schedule : schedules) {
                String line = String.format("%d %s %s %s %s %s %s %s %s\n",
                        sr++,
                        schedule.getDate(),
                        schedule.getStart_time(),
                        schedule.getEnd_time(),
                        schedule.getType(),
                        schedule.getScduledgroup(),
                        schedule.getModules().getModuleName(), // Fetching module name
                        schedule.getFaculty().getFirstName() + " " + schedule.getFaculty().getLastName(), // Fetching faculty name
                        schedule.getScheduledvenue()
                );

                writer.write(line);
            }
            System.out.println("Schedules saved to " + FILE_PATH);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	
	public void saveLogsheet(LogSheetFormDTO logsheetDTO) {
        LogSheetForm logsheet = new LogSheetForm();

        Schedules schedules = scheduleRepository.findById(logsheetDTO.getScheduleId())
            .orElseThrow(() -> new RuntimeException("Schedule not found"));
        Employee faculty = personRepository.findById(logsheetDTO.getFacultyId())
            .orElseThrow(() -> new RuntimeException("Faculty not found"));

//        logsheet.setSchedule(schedule);
//        logsheet.setDate(logsheetDTO.getDate());
//        logsheet.setStart_time(logsheetDTO.getStart_time());
//        logsheet.setEnd_time(logsheetDTO.getEnd_time());
//        logsheet.setTopicsTaught(logsheetDTO.getTopicsTaught());
//        logsheet.setAssignmentGiven(logsheetDTO.getAssignmentGiven());
//        logsheet.setStudentProgress(logsheetDTO.getStudentProgress());
//        logsheet.setFaculty(faculty);
        LogSheetForm logsheets=mapper.map(logsheetDTO, LogSheetForm.class);
        logsheets.setSchedule(schedules);
        logsheets.setFaculty(faculty);
        

        formRepository.save(logsheets);
    }

	 

}
