package com.etms.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UploadScheduleFile extends BaseEntity {
	    @ManyToOne
	    @JoinColumn(name = "course_id", nullable = false)
	    private Courses course;
	   
	    private String scheduleFilePath;
}
