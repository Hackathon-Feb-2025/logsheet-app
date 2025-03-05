package com.etms.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class LogSheetFormDTO {

	@NotNull(message = "Schedule ID must not be null")
	private Long scheduleId;
	@Schema(example = "2025-02-23") 
    private LocalDate date;

    @Schema(example = "11:00:00")
    private LocalTime start_time;

    @Schema(example = "11:00:00")
    private LocalTime end_time;

    private List<String> topicsTaught; // Now supports multiple topics
    private String assignmentGiven;
    private String studentProgress;
    @NotNull(message = "Faculty ID must not be null")
    private Long facultyId;

}
