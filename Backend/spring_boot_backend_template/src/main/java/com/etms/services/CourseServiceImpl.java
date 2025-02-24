package com.etms.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etms.repository.*;
import com.etms.pojos.Courses;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CourseServiceImpl implements CourseService{

	@Autowired
	private CourseRepository courseDao;

	@Override
	public void saveCourse(Courses course) {
		System.out.println(course);
		courseDao.save(course);
	}

	@Override
	public List<Courses> findall() {
		return courseDao.findAll();
	}
	
	

}
