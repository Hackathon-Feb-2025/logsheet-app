package com.etms.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etms.pojos.Employee;

@Repository
public interface PersonRepository extends JpaRepository<Employee, Long> {

	Optional<Employee> findByEmail(String email);
	 
}
