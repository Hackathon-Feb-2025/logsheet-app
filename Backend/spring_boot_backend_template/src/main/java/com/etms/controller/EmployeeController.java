package com.etms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etms.pojos.Employee;
import com.etms.services.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
    private EmployeeService employeeService;

    @GetMapping("/staff")
    public List<Employee> getStaffMembers() {
        return employeeService.getAllStaffMembers();
    }
}
