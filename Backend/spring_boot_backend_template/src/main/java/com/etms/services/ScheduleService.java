package com.etms.services;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etms.dto.AddScheduleDTO;
import com.etms.dto.ScheduleRespDTO;
import com.etms.pojos.Courses;
import com.etms.pojos.Employee;
import com.etms.pojos.Modules;

import com.etms.pojos.Schedules;
import com.etms.repository.CourseRepository;
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

	

	public Schedules getScheduleByFacultyAndDate(Long facultyId, LocalDate date) {
		
		Employee e=personRepository.findById(facultyId).orElseThrow(); 
		Schedules s=scheduleRepository.findByFacultyAndDate(e,date);
		
		
		return s;
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
	 

}
