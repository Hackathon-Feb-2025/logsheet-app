package com.etms.security;

import java.util.Collection;
import java.util.List;

import org.apache.catalina.Manager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.etms.pojos.Employee;


public class CustomUserDetailsImpl implements UserDetails {
    private final Employee user;


    public CustomUserDetailsImpl(Employee user) {
        this.user = user;
    }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
		// ret list of granted authorities
		// GrantedAuthority : i/f -<--- SimpleGrantedAuthority(String role)
		return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
  }


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }


    public Employee getUser() {
        return user;
    }
}