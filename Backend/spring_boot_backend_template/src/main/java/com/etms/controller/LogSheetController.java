package com.etms.controller;



import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etms.dtos.LogSheetFormDTO;
import com.etms.dtos.LogsheetDTO;
import com.etms.pojos.LogSheetForm;
import com.etms.pojos.Modules;
import com.etms.repository.LogSheetFormRepository;
import com.etms.repository.ModuleRepository;
import com.etms.services.CurriculumService;
import com.etms.services.ScheduleService;

@RestController
@RequestMapping("/api/logsheets")
public class LogSheetController {

	@Autowired
    private  CurriculumService curriculumService;
	@Autowired
    private ModuleRepository moduleRepository;
	@Autowired
    private LogSheetFormRepository logSheetFormRepository;
	@Autowired
	private ScheduleService scheduleService;


    public LogSheetController(CurriculumService curriculumService) {
        this.curriculumService = curriculumService;
    }

    // 🟢 Fetch Topics from Curriculum File Based on Module Name
    @GetMapping("/curriculum/{moduleName}")
    public ResponseEntity<Map<String, List<String>>> getCurriculumTopics(@PathVariable String moduleName) {
        return ResponseEntity.ok(curriculumService.getCurriculumTopics(moduleName));
    }

    // 🟢 Faculty Logs a Lecture/Lab Entry
    @PostMapping("/log")
    public ResponseEntity<String> logEntry(@RequestBody LogsheetDTO logSheetDTO) {
        
    	   Modules m=moduleRepository.findById(logSheetDTO.getModuleId()).orElseThrow();
        // Validate topics taught against the curriculum for the given module
        List<String> invalidTopics = Optional.ofNullable(logSheetDTO.getTopicsTaught()).orElse(List.of()).stream()
                .filter(topic -> !curriculumService.isValidTopic(m.getModuleName()
                		, topic))
                .toList();

        if (!invalidTopics.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid topics selected: " + invalidTopics);
        }
        


        curriculumService.saveLogEntry(logSheetDTO);
        return ResponseEntity.ok("Log entry saved successfully!");
    }
    
    @PostMapping
    public ResponseEntity<String> createLogSheet(@RequestBody LogSheetFormDTO logsheet) {
    	scheduleService.saveLogsheet(logsheet);
        return ResponseEntity.ok("Logsheet submitted successfully");
    }
}
