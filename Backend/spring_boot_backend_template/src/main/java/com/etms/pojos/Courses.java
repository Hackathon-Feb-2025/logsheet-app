package com.etms.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name="courses")
public class Courses extends BaseEntity{
	
	private String courseName;
 
}



















 
