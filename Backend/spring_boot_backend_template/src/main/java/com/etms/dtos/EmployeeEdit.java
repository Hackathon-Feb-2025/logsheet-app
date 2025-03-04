package com.etms.dtos;

import com.etms.pojos.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class EmployeeEdit {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Role role;  // Accept role as ENUM

	    // Getters and Setters
	    public Role getRole() {
	        return role;
	    }

	    public void setRole(Role role) {
	        this.role = role;
	    }

}
