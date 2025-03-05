package com.etms.services;

import java.util.List;

import com.etms.dtos.ApiResponse;
import com.etms.pojos.Employee;

import jakarta.validation.Valid;




public interface PersonService {

	public ApiResponse registerNewUser(Employee dto);
	public ApiResponse editUser(EmployeeEdit dto);
	public Employee getUserById(Long id);
	public List<Employee> findall();


	
	
	
	
}
