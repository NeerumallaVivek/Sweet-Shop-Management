package com.sweetshop.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin Entity
 * Represents an administrator in the Sweet Shop Management System
 * Mapped to 'admins' table in MySQL database
 */
@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

    /**
     * Primary Key - Auto-incremented admin ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adminId")
    private Integer adminId;

    /**
     * Admin's full name
     * Maximum length: 100 characters
     */
    @Column(name = "adminName", nullable = false, length = 100)
    private String adminName;

    /**
     * Admin's email address (unique identifier for login)
     * Maximum length: 150 characters
     * Must be unique across all admins
     */
    @Column(name = "adminEmail", nullable = false, unique = true, length = 150)
    private String adminEmail;

    /**
     * Admin's password (stored as BCrypt hash)
     * Maximum length: 255 characters to accommodate BCrypt hash
     */
    @Column(name = "adminPassword", nullable = false, length = 255)
    private String adminPassword;
}
