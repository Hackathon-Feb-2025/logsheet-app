package com.etms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.Courses;

public interface CourseRepository extends JpaRepository<Courses, Long> {

}
