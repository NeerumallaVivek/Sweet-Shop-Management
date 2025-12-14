package com.sweetshop.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Sweet Shop Authentication Application
 * Main entry point for Spring Boot application
 * 
 * Features:
 * - JWT-based authentication
 * - BCrypt password encryption
 * - Role-based access control (ADMIN/USER)
 * - MySQL database integration
 * - CORS enabled for React frontend
 * 
 * @author Sweet Shop Development Team
 * @version 1.0.0
 */
@SpringBootApplication
public class
SweetShopAuthApplication {

    /**
     * Main method to start the Spring Boot application
     * 
     * @param args Command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(SweetShopAuthApplication.class, args);
        System.out.println("=".repeat(60));
        System.out.println("Sweet Shop Authentication Service Started Successfully!");
        System.out.println("Server running on: http://localhost:8080");
        System.out.println("=".repeat(60));
    }
}
