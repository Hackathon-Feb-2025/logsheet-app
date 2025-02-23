package com.etms.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etms.dto.AddScheduleDTO;
import com.etms.services.ScheduleService;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
	
	@Autowired
	private ScheduleService scheduleService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addSchedule(@RequestBody AddScheduleDTO dto) {
		System.out.println("register user "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(scheduleService.AddSchedules(dto));			
	}
	
	@GetMapping("/{facultyId}/{date}")
	public ResponseEntity<?> getScheduleByDate(
	        @PathVariable Long facultyId, 
	        @PathVariable LocalDate date) 
	{
	    return ResponseEntity.status(HttpStatus.FOUND)
	            .body(scheduleService.getScheduleByFacultyAndDate(facultyId, date));
	}
	
	@GetMapping("/export")
    public ResponseEntity<String> exportSchedulesToFile() {
        scheduleService.saveSchedulesToFile();
        return ResponseEntity.ok("Schedules exported successfully.");
    }

}
