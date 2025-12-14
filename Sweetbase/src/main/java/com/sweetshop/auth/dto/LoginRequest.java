package com.sweetshop.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Login Request DTO
 * Data Transfer Object for user/admin login requests
 * Contains email, password, and role information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    /**
     * Email address for login
     * Must be a valid email format
     */
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    /**
     * Password for authentication
     * Must not be blank
     */
    @NotBlank(message = "Password is required")
    private String password;

    /**
     * Role type: either "admin" or "user"
     * Used to determine which table to query
     */
    @NotBlank(message = "Role is required")
    @Pattern(regexp = "admin|user", message = "Role must be either 'admin' or 'user'")
    private String role;
}
