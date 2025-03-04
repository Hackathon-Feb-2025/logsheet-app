package com.etms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.etms.custom_exceptions.ApiException;
import com.etms.custom_exceptions.ResourceNotFoundException;
import com.etms.dtos.ApiResponse;
import com.etms.dtos.EmployeeEdit;
import com.etms.pojos.Employee;
import com.etms.repository.PersonRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class PersonServiceImpl implements PersonService {

	
	
	@Autowired
	private ModelMapper modelMapper;
	//pwd encoder
@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private PersonRepository personrepo;
	@Override
	public ApiResponse registerNewUser(Employee dto) {
		dto.setPassword(passwordEncoder.encode(dto.getPassword()));
		// TODO Auto-generated method stub
		Employee emp=personrepo.save(dto);
		
		return new ApiResponse("registersd");
	}
	@Override
	public Employee getUserById(Long id) {
	    return personrepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	@Override
	public ApiResponse editUser(EmployeeEdit dto) {
	    Optional<Employee> existingEmployee = personrepo.findById(dto.getId());
	    if (existingEmployee.isPresent()) {
	        Employee emp = existingEmployee.get();
	        
	        // Update fields (excluding null or unchanged values)
	        emp.setFirstName(dto.getFirstName() != null ? dto.getFirstName() : emp.getFirstName());
//	        emp.setLastName(dto.getLastName() != null ? dto.getLastName() : emp.getLastName());
	        emp.setEmail(dto.getEmail() != null ? dto.getEmail() : emp.getEmail());
	        emp.setRole(dto.getRole() != null ? dto.getRole() : emp.getRole()); // Updating role

	        // Update password only if provided
	        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
	            emp.setPassword(passwordEncoder.encode(dto.getPassword()));
	        }

	        personrepo.save(emp);
	        return new ApiResponse("User updated successfully");
	    } else {
	        throw new ResourceNotFoundException("User not found with ID: " + dto.getId());
	    }
	}
}