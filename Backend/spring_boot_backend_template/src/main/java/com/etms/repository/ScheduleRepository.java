package com.etms.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.Employee;
import com.etms.pojos.Schedules;


public interface ScheduleRepository extends JpaRepository<Schedules, Long> {
	
	List<Schedules> findByFaculty(Employee faculty);
	  List<Schedules> findByFacultyAndDate(Employee faculty,LocalDate date);
	   //new
	   List<Schedules> findByDate(LocalDate date);

}
