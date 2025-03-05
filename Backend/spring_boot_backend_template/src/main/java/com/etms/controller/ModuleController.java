package com.etms.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.etms.pojos.Modules;
import com.etms.services.moduleServiceImpl;

import java.io.IOException;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    @Autowired
    private moduleServiceImpl moduleService;

    @PostMapping(value="/upload", consumes = "multipart/form-data")
    @Operation(
        summary = "Upload a curriculum file",
        description = "Uploads a curriculum file and associates it with a module",
        responses = {
            @ApiResponse(responseCode = "200", description = "File uploaded successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
        }
    )
    public ResponseEntity<?> uploadModule(
            @RequestParam Long courseId,
            @RequestParam String moduleName,
            @RequestParam("file") MultipartFile file) {
        try {
        	System.out.println("in module");
            Modules savedModule = moduleService.saveModule(courseId, moduleName, file);
            System.out.println(savedModule);
            return ResponseEntity.ok(savedModule);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }
    
	@GetMapping
	@Operation(summary= "Find all modules")
	public ResponseEntity<?> findAll() {		
		return ResponseEntity.ok(moduleService.findall());
	}
}
