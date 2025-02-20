package com.etms.service;

import java.util.List;

import com.blogs.entities.Courses;

public interface CourseService {
	public void saveCourse(Courses course);

	public List<Courses> findall();
}
