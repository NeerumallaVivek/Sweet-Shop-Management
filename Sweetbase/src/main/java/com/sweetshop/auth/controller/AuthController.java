package com.sweetshop.auth.controller;

import com.sweetshop.auth.dto.AuthResponse;
import com.sweetshop.auth.dto.LoginRequest;
import com.sweetshop.auth.dto.RegisterRequest;
import com.sweetshop.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller
 * REST API endpoints for user/admin registration and login
 * Base URL: /api/auth
 */
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Register a new admin
     * POST /api/auth/register/admin
     * 
     * @param request RegisterRequest with name, email, password, role
     * @return Success message or error
     * 
     *         Example Request Body:
     *         {
     *         "name": "John Admin",
     *         "email": "admin@sweetshop.com",
     *         "password": "admin123",
     *         "role": "admin"
     *         }
     */
    @PostMapping("/auth/register/admin")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody RegisterRequest request) {
        try {
            String message = authService.registerAdmin(request);
            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Register a new user
     * POST /api/auth/register/user
     * 
     * @param request RegisterRequest with name, email, password, role
     * @return Success message or error
     * 
     *         Example Request Body:
     *         {
     *         "name": "Jane User",
     *         "email": "user@sweetshop.com",
     *         "password": "user123",
     *         "role": "user"
     *         }
     */
    @PostMapping("/auth/register/user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            String message = authService.registerUser(request);
            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Admin login
     * POST /api/auth/login/admin
     * 
     * @param request LoginRequest with email, password, role
     * @return AuthResponse with JWT token and admin details
     * 
     *         Example Request Body:
     *         {
     *         "email": "admin@sweetshop.com",
     *         "password": "admin123",
     *         "role": "admin"
     *         }
     * 
     *         Example Response:
     *         {
     *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *         "role": "ROLE_ADMIN",
     *         "email": "admin@sweetshop.com",
     *         "name": "John Admin",
     *         "id": 1
     *         }
     */
    @PostMapping("/auth/login/admin")
    public ResponseEntity<?> loginAdmin(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.loginAdmin(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    /**
     * User login
     * POST /api/auth/login/user
     * 
     * @param request LoginRequest with email, password, role
     * @return AuthResponse with JWT token and user details
     * 
     *         Example Request Body:
     *         {
     *         "email": "user@sweetshop.com",
     *         "password": "user123",
     *         "role": "user"
     *         }
     * 
     *         Example Response:
     *         {
     *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *         "role": "ROLE_USER",
     *         "email": "user@sweetshop.com",
     *         "name": "Jane User",
     *         "id": 1
     *         }
     */
    @PostMapping("/auth/login/user")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.loginUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    /**
     * Test endpoint for Admin role
     * GET /api/admin/test
     * Requires ROLE_ADMIN authority
     * 
     * Use this to verify JWT authentication and admin role authorization
     * Include JWT token in Authorization header:
     * Authorization: Bearer <your-jwt-token>
     */
    @GetMapping("/admin/test")
    public ResponseEntity<?> adminTest() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin access granted!");
        response.put("role", "ROLE_ADMIN");
        return ResponseEntity.ok(response);
    }

    /**
     * Test endpoint for User role
     * GET /api/user/test
     * Requires ROLE_USER authority
     * 
     * Use this to verify JWT authentication and user role authorization
     * Include JWT token in Authorization header:
     * Authorization: Bearer <your-jwt-token>
     */
    @GetMapping("/user/test")
    public ResponseEntity<?> userTest() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User access granted!");
        response.put("role", "ROLE_USER");
        return ResponseEntity.ok(response);
    }
}
