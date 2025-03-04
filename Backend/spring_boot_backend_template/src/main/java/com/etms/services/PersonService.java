package com.etms.services;

import com.etms.dtos.ApiResponse;
import com.etms.dtos.EmployeeEdit;
import com.etms.pojos.Employee;




public interface PersonService {

	public ApiResponse registerNewUser(Employee dto);
	public ApiResponse editUser(EmployeeEdit dto);
	public Employee getUserById(Long id);


	
	
	
	
}
