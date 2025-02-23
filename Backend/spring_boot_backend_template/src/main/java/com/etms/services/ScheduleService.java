package com.etms.services;

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
	 

}
