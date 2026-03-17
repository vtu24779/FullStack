# 📘 Task 10: Full Stack Student Management (Spring Boot + JPA + MySQL)

---

## 🎯 Objective

To build a **RESTful Student Management System** using:

* Spring Boot
* Spring Web
* Spring Data JPA
* MySQL Database
* Postman for API testing

This application performs **CRUD operations** (Create, Read, Update, Delete) on student data.

---

## 🛠️ Project Setup

### 🔹 Create Spring Starter Project

1. Go to **File → New → Spring Starter Project**
2. Choose:

   * Maven Project
3. Add dependencies:

   * Spring Web
   * Spring Data JPA
   * H2 Database *(optional for testing)*
4. Click **Finish**

---

## ⚙️ Application Configuration

📁 `src/main/resources/application.properties`

```properties
spring.application.name=task10fullstack

spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=root
spring.datasource.password=prathibha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

server.port=8081
```

---

## 🗄️ Database Setup (MySQL)

Open MySQL Workbench and run:

```sql
CREATE DATABASE studentdb;
USE studentdb;
```

---

## 📁 Project Structure

```text
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
├── controller
│   └── StudentController.java
```

---

## 👨‍💻 Implementation

### 🔹 1. Student Entity

```java
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String dept;
    private Integer age;

    public Student() {}

    public Student(Integer id, String name, String dept, Integer age) {
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.age = age;
    }

    // Getters and Setters
}
```

---

### 🔹 2. Repository

```java
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
```

---

### 🔹 3. Service Layer

```java
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

    public Student saveStudent(Student s) {
        return repo.save(s);
    }

    public List<Student> getAllStudent() {
        return repo.findAll();
    }

    public Student getStudentById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Student updateStudent(Student s) {
        return repo.save(s);
    }

    public void deleteStudent(int id) {
        repo.deleteById(id);
    }
}
```

---

### 🔹 4. Controller (REST API)

```java
package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudent();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {
        return service.getStudentById(id);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id, @RequestBody Student student) {
        student.setId(id);
        return service.updateStudent(student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        service.deleteStudent(id);
        return "Student deleted successfully";
    }
}
```

---

## 📦 Add MySQL Dependency (pom.xml)

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.4.0</version>
</dependency>
```

---

## ▶️ Run the Application

1. Run the main class as **Spring Boot Application**
2. Server starts on:

```
http://localhost:8081
```

---

## 🧪 API Testing using Postman

### 🔹 Create Student (POST)

```
POST http://localhost:8081/students
```

**Body (JSON):**

```json
{
  "name": "Priya",
  "dept": "CSE",
  "age": 21
}
```

---

### 🔹 Get All Students (GET)

```
GET http://localhost:8081/students
```

---

### 🔹 Get Student by ID (GET)

```
GET http://localhost:8081/students/3
```

---

### 🔹 Update Student (PUT)

```
PUT http://localhost:8081/students/3
```

**Body:**

```json
{
  "name": "Updated Name",
  "dept": "IT",
  "age": 22
}
```

---

### 🔹 Delete Student (DELETE)

```
DELETE http://localhost:8081/students/3
```

---

## 🗃️ Verify in MySQL

Run:

```sql
SELECT * FROM student;
```

---

## 🔍 Concepts Covered

* ✔ Spring Boot REST API
* ✔ Spring Data JPA
* ✔ MySQL Integration
* ✔ CRUD Operations
* ✔ Layered Architecture (Controller → Service → Repository)

---

## 📌 Conclusion

This project demonstrates a full-stack backend application using Spring Boot and MySQL. It efficiently handles student data through REST APIs and showcases real-world CRUD operations with proper architecture.

---
