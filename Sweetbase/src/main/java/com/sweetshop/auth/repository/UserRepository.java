package com.sweetshop.auth.repository;

import com.sweetshop.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User Repository
 * JPA Repository for User entity
 * Provides CRUD operations and custom query methods for User table
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Find a user by email address
     * Used during authentication process
     * 
     * @param email User's email address
     * @return Optional containing User if found, empty otherwise
     */
    Optional<User> findByUserEmail(String email);

    /**
     * Check if a user exists with given email
     * Used during registration to prevent duplicate emails
     * 
     * @param email Email address to check
     * @return true if user exists with this email, false otherwise
     */
    boolean existsByUserEmail(String email);
}
