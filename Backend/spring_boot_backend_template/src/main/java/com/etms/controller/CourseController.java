package com.etms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etms.pojos.Courses;
import com.etms.services.CourseService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/courses")
public class CourseController {

	@Autowired
	private CourseService courseService;
	
	@PostMapping
	@Operation(summary= "Course added")
	public ResponseEntity<?> save(@RequestBody Courses course) {		
		courseService.saveCourse(course);
		return ResponseEntity.ok("Course added successfully");
	}
	
	@GetMapping
	@Operation(summary= "Find all courses")
	public ResponseEntity<?> findAll() {		
		return ResponseEntity.ok(courseService.findall());
	}

}
