package com.sweetshop.auth.repository;

import com.sweetshop.auth.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Admin Repository
 * JPA Repository for Admin entity
 * Provides CRUD operations and custom query methods for Admin table
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    /**
     * Find an admin by email address
     * Used during authentication process
     * 
     * @param email Admin's email address
     * @return Optional containing Admin if found, empty otherwise
     */
    Optional<Admin> findByAdminEmail(String email);

    /**
     * Check if an admin exists with given email
     * Used during registration to prevent duplicate emails
     * 
     * @param email Email address to check
     * @return true if admin exists with this email, false otherwise
     */
    boolean existsByAdminEmail(String email);
}
