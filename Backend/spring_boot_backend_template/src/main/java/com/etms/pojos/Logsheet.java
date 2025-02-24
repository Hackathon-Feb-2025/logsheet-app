package com.etms.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor

public class Logsheet extends BaseEntity {
	
	private LocalDate date;
	private LocalTime start_time;
	private LocalTime end_time;
	@OneToOne
	private Courses course_id;
	@OneToOne
	private Modules module_id ;//(Foreign Key)
	@Enumerated(EnumType.STRING)
	private LogType type; //(Lecture/Lab)
	private List<String> topics_taught; //(for Lecture)
	private String assignment_given ;//(for Lab)
	private String student_progress;//(for Lab)
	@OneToOne
	private Employee faculty_id ;//(Foreign Key to Staff table)
	
	

}
