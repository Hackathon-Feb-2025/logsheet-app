package com.etms.controller;

import com.etms.dto.ModuleProgressReportDTO;
import com.etms.dto.ReportRequestDTO;
import com.etms.services.ModuleProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class ModuleProgressController {

    @Autowired
    private ModuleProgressService moduleProgressService;

    @PostMapping("/generateReport")
    public ResponseEntity<ModuleProgressReportDTO> generateReport(@RequestBody ReportRequestDTO request) {
        ModuleProgressReportDTO report = moduleProgressService.generateReport(
            request.getCourse(), request.getModule(), request.getFaculty()
        );
        return ResponseEntity.ok(report);
    }
}
