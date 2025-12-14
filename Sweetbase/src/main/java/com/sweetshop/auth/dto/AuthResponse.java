package com.sweetshop.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Authentication Response DTO
 * Data Transfer Object returned after successful login or registration
 * Contains JWT token and user information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    /**
     * JWT token for authentication
     * Should be included in subsequent requests as:
     * Authorization: Bearer <token>
     */
    private String token;

    /**
     * User/Admin role
     * Either "ROLE_ADMIN" or "ROLE_USER"
     */
    private String role;

    /**
     * Email address of authenticated user/admin
     */
    private String email;

    /**
     * Name of authenticated user/admin
     */
    private String name;

    /**
     * User ID or Admin ID
     */
    private Integer id;

    /**
     * Constructor for creating response with token and role only
     */
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }
}
