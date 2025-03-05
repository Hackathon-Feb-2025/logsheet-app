package com.etms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.Courses;
import com.etms.pojos.Employee;
import com.etms.pojos.Logsheet;
import com.etms.pojos.Modules;

public interface LogSheetRepository extends JpaRepository<Logsheet, Long>{
    List<Logsheet> findByCourseAndModuleAndFaculty(Courses course, Modules module, Employee faculty);

	List<Logsheet> findByModule(Modules module);

}
