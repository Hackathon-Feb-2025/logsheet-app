package com.etms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.Employee;
import com.etms.pojos.Role;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	List<Employee> findByRole(Role role);
}
