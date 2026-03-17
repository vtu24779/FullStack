# 📘 Student Data Access Layer (Spring Data JPA)

---

## 🎯 Objective

To implement a **Data Access Layer (DAL)** using:

* Spring Boot
* Spring Data JPA (`JpaRepository`)
* MySQL Database
* Custom Query Methods

This project demonstrates how to retrieve data using **derived query methods** like:

* `findByDepartment`
* `findByAge`
* `findByAgeGreaterThan`
* `findByDepartmentAndAge`

---

## 📍 Project Location

```
C:\Users\Prathibha\eclipse-workspace\studentDAL
```

---

## 🛠️ Project Setup

### 🔹 Create Spring Starter Project

1. File → New → Spring Starter Project
2. Project Name: **studentDAL**
3. Add Dependencies:

   * Spring Web
   * Spring Data JPA
   * MySQL Driver
4. Click **Finish**

---

## ⚙️ Application Configuration

📁 `src/main/resources/application.properties`

```properties id="mcc5pq"
spring.application.name=StudentDAL

spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=root
spring.datasource.password=prathibha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8081
```

---

## 🗄️ Database Setup (MySQL)

Run the following in MySQL Workbench:

```sql id="m2p7r4"
CREATE DATABASE studentdb;
USE studentdb;

INSERT INTO student(id,name,department,age)
VALUES (1,'Arun','CSE',20);

INSERT INTO student(id,name,department,age)
VALUES (2,'Meena','ECE',21);

INSERT INTO student(id,name,department,age)
VALUES (3,'Rahul','CSE',22);
```

---

## 📁 Project Structure

```text id="9fxt92"
src/main/java/com/example/demo
│
├── model
│   └── Student.java
│
├── repository
│   └── StudentRepository.java
│
├── service
│   └── StudentService.java
│
└── controller
    └── StudentController.java
```

---

## 👨‍💻 Implementation

### 🔹 1. Student Entity

```java id="t9ajgk"
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class Student {

    @Id
    private Integer id;
    private String name;
    private String department;
    private Integer age;

    public Student() {}

    public Student(Integer id, String name, String department, Integer age) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.age = age;
    }

    // Getters and Setters
}
```

---

### 🔹 2. StudentRepository

```java id="cyn7x5"
package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    List<Student> findByDepartment(String department);

    List<Student> findByAge(int age);

    List<Student> findByAgeGreaterThan(int age);

    List<Student> findByDepartmentAndAge(String department, int age);
}
```

---

### 🔹 3. StudentService

```java id="ps7k1f"
package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<Student> getStudentByDepartment(String dept) {
        return repo.findByDepartment(dept);
    }

    public List<Student> getStudentByAge(int age) {
        return repo.findByAge(age);
    }

    public List<Student> getStudentGreaterThan(int age) {
        return repo.findByAgeGreaterThan(age);
    }

    public List<Student> getByDepartmentAndAge(String dept, int age) {
        return repo.findByDepartmentAndAge(dept, age);
    }
}
```

---

### 🔹 4. StudentController

```java id="0apbsl"
package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;

@RestController
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/department/{dept}")
    public List<Student> getByDepartment(@PathVariable String dept) {
        return service.getStudentByDepartment(dept);
    }

    @GetMapping("/age/{age}")
    public List<Student> getByAge(@PathVariable int age) {
        return service.getStudentByAge(age);
    }

    @GetMapping("/StudentsWhichAreGreaterThanAge/{age}")
    public List<Student> getStudentGreaterThan(@PathVariable int age) {
        return service.getStudentGreaterThan(age);
    }

    @GetMapping("/department/{dept}/age/{age}")
    public List<Student> getByAgeAndDepartment(@PathVariable String dept, @PathVariable int age) {
        return service.getByDepartmentAndAge(dept, age);
    }
}
```

---

## ▶️ Run the Application

1. Run as **Spring Boot Application**
2. Server runs at:

```text id="u6tbbr"
http://localhost:8081
```

---

## 🧪 API Testing (Postman)

### 🔹 Get Students by Department

```text id="4q2c5r"
GET http://localhost:8081/department/CSE
```

---

### 🔹 Get Students by Age

```text id="u7cphl"
GET http://localhost:8081/age/20
```

---

### 🔹 Get Students with Age Greater Than

```text id="pr9p2x"
GET http://localhost:8081/StudentsWhichAreGreaterThanAge/20
```

---

### 🔹 Get Students by Department AND Age

```text id="2h8xyc"
GET http://localhost:8081/department/CSE/age/22
```

---

## 🔍 Concepts Covered

* ✔ Spring Data JPA
* ✔ JpaRepository
* ✔ Derived Query Methods
* ✔ REST API Development
* ✔ MySQL Integration

---

## 📌 Conclusion

This project demonstrates how to build a **Data Access Layer using Spring Data JPA**. It uses built-in repository methods and custom query derivation techniques to efficiently retrieve data based on different conditions.

---
