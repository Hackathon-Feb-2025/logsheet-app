package com.etms.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.etms.custom_exceptions.ApiException;
import com.etms.custom_exceptions.ResourceNotFoundException;
import com.etms.dtos.ApiResponse;
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
	
	
	
	

	}
