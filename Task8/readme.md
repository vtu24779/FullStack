Task 8: Create a simple Employee Management module using Spring Core. Demonstrate Inversion of Control and Dependency Injection using annotations such as @Component and @Autowired. Use BeanFactory to manage beans and store employee data in memory.
Create a spring framework by the using the maven project :
1.File-> new-> maven project
2.Use the quickstart and give the artifact id as employee and finish
3.give the group id as employee management
4.go to pom.xml and the spring dependency and add the spring context dependency from maven repository of version 5.3.8(Copy and paste)
5.Create a class employee in the package model and wirte the variable and generate constructors using fields and the toString from source
package com.example.model;

public class Employee {
    private int id;
    private String name;
    private String dept;

    public Employee(int id, String name, String dept) {
        this.id = id;
        this.name = name;
        this.dept = dept;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", name=" + name + ", dept=" + dept + "]";
    }
}


6.Create a another class named Employeerepository in the package com.example.employeerepository
Create a list for the employees:;
package com.example.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.model.Employee;

@Component
public class EmployeeRepository {

    private List<Employee> employeeList = new ArrayList<>();

    public void addEmployee(Employee employee) {
        employeeList.add(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeList;
    }
}


7.Create a new class named employeeService to create the employee in the com.example.service package
package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.model.Employee;
import com.example.repository.EmployeeRepository;

@Component
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void createEmployee(int id, String name, String dept) {
        Employee emp = new Employee(id, name, dept);
        employeeRepository.addEmployee(emp);
    }

    public List<Employee> fetchAllEmployees() {
        return employeeRepository.getAllEmployees();
    }
}


8. create a Configuration class named AppConfig inside a com.example.model.config
package com.example.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
}


9.in the main class App.java:
package com.example;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.example.config.AppConfig;
import com.example.service.EmployeeService;

public class App {
    public static void main(String[] args) {

        BeanFactory factory = new AnnotationConfigApplicationContext(AppConfig.class);

        EmployeeService service = factory.getBean(EmployeeService.class);

        service.createEmployee(101, "Raha", "CSE");
        service.createEmployee(102, "Kiran", "ECE");
        service.createEmployee(103, "Arun", "IT");

        service.fetchAllEmployees().forEach(System.out::println);
    }
}


10.Run the App.java as an Java Application to get the output like 
 





