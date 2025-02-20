package com.etms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogs.dao.CourseDao;
import com.blogs.entities.Courses;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CourseServiceImpl implements CourseService{

	@Autowired
	private CourseDao courseDao;

	@Override
	public void saveCourse(Courses course) {
		courseDao.save(course);
	}

	@Override
	public List<Courses> findall() {
		return courseDao.findAll();
	}
	
	

}
