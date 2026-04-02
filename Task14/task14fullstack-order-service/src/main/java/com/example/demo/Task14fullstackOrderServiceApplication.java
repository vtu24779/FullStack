package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
@EnableFeignClients
@SpringBootApplication
public class Task14fullstackOrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(Task14fullstackOrderServiceApplication.class, args);
	}

}
