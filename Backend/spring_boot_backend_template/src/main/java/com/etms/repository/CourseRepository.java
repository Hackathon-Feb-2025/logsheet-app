package com.etms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.Courses;

public interface CourseRepository extends JpaRepository<Courses, Long> {

	Optional<Courses> findByCourseName(String courseName);

}
