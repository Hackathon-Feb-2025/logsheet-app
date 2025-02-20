package com.etms.dtos;

import com.etms.pojos.Employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
	private String message;
	private String jwt;
	private Employee emp;
	private String msg;
	
	
	
	public AuthResponse(String string, String token, Employee user) {
		this.message=string;
		this.jwt=token;
		this.emp=user;
		
	}
	
}
