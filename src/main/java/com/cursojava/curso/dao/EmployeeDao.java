package com.cursojava.curso.dao;

import com.cursojava.curso.models.Employee;
import com.cursojava.curso.models.Usuario;

import java.util.List;

public interface EmployeeDao {

    List<Employee> getEmployees();

    Employee getEmployee(Long id);
}
