package com.etms.services;

import com.etms.dtos.ApiResponse;
import com.etms.pojos.Employee;

import jakarta.validation.Valid;




public interface PersonService {

	public ApiResponse registerNewUser(Employee dto);

	
	
	
	
}
