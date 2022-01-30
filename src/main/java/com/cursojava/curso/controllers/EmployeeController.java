package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.EmployeeDao;
import com.cursojava.curso.models.Employee;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token) {
        String usuarioID = jwtUtil.getKey(token);
        return usuarioID != null;
    }

    @RequestMapping(value = "api/employees", method = RequestMethod.GET)
    public List<Employee> employees(
            @RequestHeader("Authorization") String token
    ) {
        if (!validarToken(token))
            return null;
        return employeeDao.getEmployees();
    }

    @RequestMapping(value = "api/employee/{id}", method = RequestMethod.GET)
    public Employee getEmployee(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) {
        if (!validarToken(token))
            return null;

        return employeeDao.getEmployee(id);
    }


}
