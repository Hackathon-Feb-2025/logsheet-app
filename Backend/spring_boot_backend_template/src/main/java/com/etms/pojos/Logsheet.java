package com.etms.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class Logsheet extends BaseEntity {
	
	

	    @OneToOne
	    private Schedules schedule; // Foreign Key to Schedule

	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	    private LocalDate date;

	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	    private LocalTime start_time;

	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	    private LocalTime end_time;

	    @OneToOne
	    private Courses course; // Foreign Key

	    @OneToOne
	    private Modules module; // Foreign Key

	    @Enumerated(EnumType.STRING)
	    private LogType type; // Lecture or Lab

	    @ElementCollection
	    private List<String> topicsTaught; // Topics taught in Lecture

	    private String assignmentGiven; // Assignments in Lab

	    private String studentProgress; // Student progress in Lab

	    @OneToOne
	    private Employee faculty; // Foreign Key (Staff Table)
	}

	


