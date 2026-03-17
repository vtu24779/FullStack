Task 8: Create a simple Employee Management module using Spring Core. Demonstrate Inversion of Control and Dependency Injection using annotations such as @Component and @Autowired. Use BeanFactory to manage beans and store employee data in memory.
# 📘 Task 8: Employee Management Module using Spring Core

## 🎯 Objective

To develop a simple Employee Management module using **Spring Core**, demonstrating:

* Inversion of Control (IoC)
* Dependency Injection (DI)
* Annotation-based configuration (`@Component`, `@Autowired`)
* Bean management using `BeanFactory`
* In-memory data storage

---

## 🛠️ Project Setup (Maven)

1. Go to **File → New → Maven Project**
2. Select **Quickstart Archetype**
3. Enter:

   * **Group ID**: `com.example`
   * **Artifact ID**: `employee`
4. Click **Finish**

---

## 📦 Add Dependency (pom.xml)

Add the following Spring Core dependency:

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.8</version>
</dependency>
```

---

## 📁 Project Structure

```
src/main/java/com/example
│
├── model
│   └── Employee.java
│
├── repository
│   └── EmployeeRepository.java
│
├── service
│   └── EmployeeService.java
│
├── config
│   └── AppConfig.java
│
└── App.java
```

---

## 👨‍💻 Implementation

### 🔹 1. Employee Class (Model)

```java
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
```

---

### 🔹 2. EmployeeRepository

```java
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
```

---

### 🔹 3. EmployeeService

```java
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
```

---

### 🔹 4. Configuration Class

```java
package com.example.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
}
```

---

### 🔹 5. Main Class (BeanFactory)

```java
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
```

---

## ▶️ How to Run

1. Right-click on `App.java`
2. Select **Run as → Java Application**

---

## ✅ Expected Output

```
Employee [id=101, name=Raha, dept=CSE]
Employee [id=102, name=Kiran, dept=ECE]
Employee [id=103, name=Arun, dept=IT]
```

---

## 🔍 Concepts Demonstrated

### ✔ Inversion of Control (IoC)

* Object creation is handled by Spring container.

### ✔ Dependency Injection (DI)

* `@Autowired` injects `EmployeeRepository` into `EmployeeService`.

### ✔ Annotations Used

* `@Component` → Marks classes as Spring beans
* `@Autowired` → Injects dependencies
* `@Configuration` → Configuration class
* `@ComponentScan` → Scans packages

### ✔ BeanFactory

* Used to load and manage Spring beans:

```java
BeanFactory factory = new AnnotationConfigApplicationContext(AppConfig.class);
```

---

## 📌 Conclusion

This project successfully demonstrates a basic **Spring Core application** using annotation-based configuration. It shows how Spring manages objects and dependencies efficiently using IoC and DI principles, without using XML configuration.

---






