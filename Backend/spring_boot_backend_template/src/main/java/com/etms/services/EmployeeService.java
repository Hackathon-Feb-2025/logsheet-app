package com.etms.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etms.pojos.Employee;
import com.etms.pojos.Role;
import com.etms.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	 public List<Employee> getAllStaffMembers() {
	       // return employeeRepository.findByRole(Role.TECHSTAFF); 
		 return employeeRepository.findAll();
	    }
}
