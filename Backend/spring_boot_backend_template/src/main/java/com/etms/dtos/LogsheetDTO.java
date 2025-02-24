package com.etms.dtos;



import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class LogsheetDTO {
    private Long scheduleId;
    
    @Schema(example = "2025-02-23") 
    private LocalDate date;

    @Schema(example = "11:00:00")
    private LocalTime startTime;

    @Schema(example = "11:00:00")
    private LocalTime endTime;

    private Long courseId;
    private Long moduleId;
    private String type; // Lecture/Lab

    private List<String> topicsTaught; // For Lecture
    private String assignmentGiven; // For Lab
    private String studentProgress; // For Lab

    private Long facultyId;
}

