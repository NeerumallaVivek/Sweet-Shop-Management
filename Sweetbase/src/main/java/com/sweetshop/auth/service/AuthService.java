package com.sweetshop.auth.service;

import com.sweetshop.auth.config.JwtUtil;
import com.sweetshop.auth.dto.AuthResponse;
import com.sweetshop.auth.dto.LoginRequest;
import com.sweetshop.auth.dto.RegisterRequest;
import com.sweetshop.auth.entity.Admin;
import com.sweetshop.auth.entity.User;
import com.sweetshop.auth.repository.AdminRepository;
import com.sweetshop.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Authentication Service
 * Handles user/admin registration and login logic
 * Generates JWT tokens upon successful authentication
 */
@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Register a new admin
     * 
     * @param request Registration request with name, email, password
     * @return Success message
     * @throws RuntimeException if email already exists
     */
    public String registerAdmin(RegisterRequest request) {
        // Check if admin already exists with this email
        if (adminRepository.existsByAdminEmail(request.getEmail())) {
            throw new RuntimeException("Admin already exists with email: " + request.getEmail());
        }

        // Create new admin entity
        Admin admin = new Admin();
        admin.setAdminName(request.getName());
        admin.setAdminEmail(request.getEmail());
        // Encrypt password using BCrypt
        admin.setAdminPassword(passwordEncoder.encode(request.getPassword()));

        // Save admin to database
        adminRepository.save(admin);

        return "Admin registered successfully!";
    }

    /**
     * Register a new user
     * 
     * @param request Registration request with name, email, password
     * @return Success message
     * @throws RuntimeException if email already exists
     */
    public String registerUser(RegisterRequest request) {
        // Check if user already exists with this email
        if (userRepository.existsByUserEmail(request.getEmail())) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        // Create new user entity
        User user = new User();
        user.setUserName(request.getName());
        user.setUserEmail(request.getEmail());
        // Encrypt password using BCrypt
        user.setUserPassword(passwordEncoder.encode(request.getPassword()));

        // Save user to database
        userRepository.save(user);

        return "User registered successfully!";
    }

    /**
     * Admin login
     * 
     * @param request Login request with email and password
     * @return AuthResponse with JWT token and admin details
     * @throws RuntimeException if credentials are invalid
     */
    public AuthResponse loginAdmin(LoginRequest request) {
        // Find admin by email
        Admin admin = adminRepository.findByAdminEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Verify password using BCrypt
        if (!passwordEncoder.matches(request.getPassword(), admin.getAdminPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(
                admin.getAdminId(),
                admin.getAdminEmail(),
                "ROLE_ADMIN");

        // Return authentication response
        return new AuthResponse(
                token,
                "ROLE_ADMIN",
                admin.getAdminEmail(),
                admin.getAdminName(),
                admin.getAdminId());
    }

    /**
     * User login
     * 
     * @param request Login request with email and password
     * @return AuthResponse with JWT token and user details
     * @throws RuntimeException if credentials are invalid
     */
    public AuthResponse loginUser(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByUserEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Verify password using BCrypt
        if (!passwordEncoder.matches(request.getPassword(), user.getUserPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(
                user.getUserId(),
                user.getUserEmail(),
                "ROLE_USER");

        // Return authentication response
        return new AuthResponse(
                token,
                "ROLE_USER",
                user.getUserEmail(),
                user.getUserName(),
                user.getUserId());
    }
}
