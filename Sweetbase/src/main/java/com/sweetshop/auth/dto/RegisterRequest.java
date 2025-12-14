package com.sweetshop.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Register Request DTO
 * Data Transfer Object for user/admin registration requests
 * Contains name, email, password, and role information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    /**
     * Full name of the user/admin
     * Maximum length: 100 characters
     */
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    /**
     * Email address for registration
     * Must be a valid email format and unique
     */
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    /**
     * Password for the account
     * Minimum length: 6 characters
     */
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    /**
     * Role type: either "admin" or "user"
     * Determines which table the record will be inserted into
     */
    @NotBlank(message = "Role is required")
    @Pattern(regexp = "admin|user", message = "Role must be either 'admin' or 'user'")
    private String role;
}
