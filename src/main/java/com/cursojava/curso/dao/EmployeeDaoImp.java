package com.cursojava.curso.dao;

import com.cursojava.curso.models.Employee;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class EmployeeDaoImp implements EmployeeDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Employee> getEmployees() {
        String query = "SELECT emp.id, user.nombre, user.apellido, emp.departamento, emp.sueldo FROM Employee emp, Usuario user WHERE emp.user_employee = user.id";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Employee getEmployee(Long id) {

        Employee employee = entityManager.find(Employee.class, id);
        System.out.println(employee);
        return employee;
    }

}
