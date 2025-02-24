package com.etms.dto;

import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleRespDTO {

private Long course;
	
	private Long modules; //(Foreign Key)
	private LocalTime date;
	private LocalTime start_time;
	private LocalTime end_time;
	
	private String  type ;//(Lecture/Lab)
	
	private String group; //(Theory/E1/E2)
	
	private Long faculty_id ;//(Foreign Key to Staff table)
	
	private String venue;
}
