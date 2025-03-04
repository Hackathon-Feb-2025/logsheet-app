package com.etms.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.etms.pojos.UploadScheduleFile;
import com.etms.services.UploadScheduleFServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/upschedule")
public class UploadScheduleController {
	@Autowired
	private UploadScheduleFServiceImpl upSchService;
	
	 @PostMapping(value="/upload", consumes = "multipart/form-data")
	    @Operation(
	        summary = "Upload a schedule file",
	        description = "Uploads a schedule file and associates it with a course",
	        responses = {
	            @ApiResponse(responseCode = "200", description = "File uploaded successfully"),
	            @ApiResponse(responseCode = "500", description = "Internal server error")
	        }
	    )
	    public ResponseEntity<?> uploadSchedule(
	            @RequestParam Long courseId,
	            @RequestParam("file") MultipartFile file) {
	        try {
	        	System.out.println("in module");
	            UploadScheduleFile savedSchedule = upSchService.saveScheduleFile(courseId, file);
	            System.out.println(savedSchedule);
	            return ResponseEntity.ok(savedSchedule);
	        } catch (IOException e) {
	            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
	        }
	    }

}
