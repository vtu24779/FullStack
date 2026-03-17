# 📘 Spring Boot + Spring MVC + Thymeleaf

## Employee Management Module

---

## 🎯 Objective

To develop a simple **Employee Management web application** using:

* Spring Boot
* Spring MVC
* Thymeleaf
* Annotation-based configuration

The application allows users to search for employee details by ID and displays the result dynamically.

---

## 🛠️ Project Setup

### 🔹 Steps to Create Project

1. Go to **File → New → Spring Starter Project**
2. Add dependencies:

   * **Spring Web**
   * **Thymeleaf**
3. Click **Finish**

---

## 📦 Optional Dependency (pom.xml)

Add Tomcat Jasper if required:

```xml
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
```

---

## 📁 Project Structure

```
src/main/java/com/example/demo
│
├── controller
│   └── EmployeeController.java
│
├── repository
│   └── EmployeeRepository.java
│
└── Employee.java

src/main/resources/templates
│
├── home.html
└── employee.html
```

---

## 👨‍💻 Implementation

### 🔹 1. Employee Class (Model)

```java
package com.example.demo;

public class Employee {
    private int id;
    private String name;
    private String dept;

    public Employee(int id, String name, String dept) {
        this.id = id;
        this.name = name;
        this.dept = dept;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }
}
```

---

### 🔹 2. EmployeeRepository

```java
package com.example.demo.repository;

import java.util.Map;
import org.springframework.stereotype.Component;
import com.example.demo.Employee;

@Component
public class EmployeeRepository {

    private final Map<Integer, Employee> store = Map.of(
        101, new Employee(101, "Anand", "CSE"),
        102, new Employee(102, "Kiran", "ECE"),
        103, new Employee(103, "Ravi", "IT")
    );

    public Employee findById(int id) {
        return store.get(id);
    }
}
```

---

### 🔹 3. EmployeeController

```java
package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Employee;
import com.example.demo.repository.EmployeeRepository;

@Controller
public class EmployeeController {

    @Autowired
    private EmployeeRepository repo;

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/employee")
    public String getEmployee(@RequestParam("id") int id, Model model) {

        Employee emp = repo.findById(id);

        if (emp == null) {
            model.addAttribute("error", "Employee not found for ID: " + id);
            return "employee";
        }

        model.addAttribute("emp", emp);
        return "employee";
    }
}
```

---

### 🔹 4. home.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
</head>
<body>

<h2>Employee Management (Spring MVC)</h2>

<form action="/employee" method="get">
    <input type="number" name="id" required />
    <button type="submit">Search</button>
</form>

<p>Try IDs: 101, 102, 103</p>

</body>
</html>
```

---

### 🔹 5. employee.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8">
<title>Employee Details</title>
</head>
<body>

<h2>Employee Details</h2>

<p th:if="${error != null}" th:text="${error}" style="color:red;"></p>

<div th:if="${emp != null}">
    <p><b>ID:</b> <span th:text="${emp.id}"></span></p>
    <p><b>Name:</b> <span th:text="${emp.name}"></span></p>
    <p><b>Department:</b> <span th:text="${emp.dept}"></span></p>
</div>

<a href="/">Back</a>

</body>
</html>
```

---

## ▶️ How to Run

1. Run the main class (`DemoApplication.java`)
2. Open browser:

```
http://localhost:8080
```

3. Enter an employee ID (101, 102, 103)

---

## 🔁 Application Flow (MVC)

1. User enters ID in **home.html**
2. Request goes to **EmployeeController**
3. Controller fetches data from **EmployeeRepository**
4. Data is passed to **employee.html**
5. Result is displayed to the user

---

## 🔍 Concepts Used

### ✔ Spring MVC

Handles request-response flow using controllers.

### ✔ Spring Boot

Provides auto-configuration and embedded server.

### ✔ Thymeleaf

Template engine to render dynamic HTML.

### ✔ Dependency Injection

`@Autowired` injects repository into controller.

---

## ✅ Expected Output

* Valid ID → Displays employee details
* Invalid ID → Shows error message

---

## 📌 Conclusion

This project demonstrates a simple **Spring Boot MVC application** using Thymeleaf. It follows the MVC architecture, handles user input, and dynamically displays employee data without using XML configuration.

---
