package com.etms.services;

import java.util.List;

import com.etms.pojos.Courses;

public interface CourseService {
	public void saveCourse(Courses course);

	public List<Courses> findall();
}
