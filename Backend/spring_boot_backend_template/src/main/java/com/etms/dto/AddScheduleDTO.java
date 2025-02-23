package com.etms.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.etms.pojos.SchduledGroup;
import com.etms.pojos.ScheduledVenue;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddScheduleDTO {
	
	private Long course;
	
	private Long modules; //(Foreign Key)
	@Schema(example = "2025-02-23") 
	private LocalDate date;

	@Schema(example = "09:30:00") // Valid time format
    private LocalTime start_time;

    @Schema(example = "11:00:00")
    private LocalTime end_time;

	
	private String  type ;//(Lecture/Lab)
	
	private SchduledGroup scduledgroup;; //(Theory/E1/E2)
	
	private Long faculty_id ;//(Foreign Key to Staff table)
	
	private ScheduledVenue scheduledvenue;

}
