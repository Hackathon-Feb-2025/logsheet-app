package com.etms.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class Schedules extends BaseEntity{
	
	
	
	@ManyToOne
	@JoinColumn(unique = false)
	private Courses course;
	@ManyToOne
	@JoinColumn(unique = false)
	private Modules modules; //(Foreign Key)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private LocalTime start_time;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private LocalTime end_time;
	@Enumerated(EnumType.STRING)
	private LogType type ;//(Lecture/Lab)
	@Enumerated(EnumType.STRING)
	private SchduledGroup scduledgroup; //(Theory/E1/E2)
	@ManyToOne
	@JoinColumn(unique = false)
	private Employee faculty ;//(Foreign Key to Staff table)
	@Enumerated(EnumType.STRING)
	private ScheduledVenue scheduledvenue;

}




