package com.sweetshop.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User Entity
 * Represents a regular user in the Sweet Shop Management System
 * Mapped to 'users' table in MySQL database
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * Primary Key - Auto-incremented user ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private Integer userId;

    /**
     * User's full name
     * Maximum length: 100 characters
     */
    @Column(name = "userName", nullable = false, length = 100)
    private String userName;

    /**
     * User's email address (unique identifier for login)
     * Maximum length: 150 characters
     * Must be unique across all users
     */
    @Column(name = "userEmail", nullable = false, unique = true, length = 150)
    private String userEmail;

    /**
     * User's password (stored as BCrypt hash)
     * Maximum length: 255 characters to accommodate BCrypt hash
     */
    @Column(name = "userPassword", nullable = false, length = 255)
    private String userPassword;
}
