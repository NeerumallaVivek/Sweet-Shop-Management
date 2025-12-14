package com.sweetshop.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Password Configuration
 * Configures BCrypt password encoder for secure password hashing
 */
@Configuration
public class PasswordConfig {
    
    /**
     * BCrypt Password Encoder Bean
     * Uses BCrypt hashing algorithm with default strength (10 rounds)
     * BCrypt automatically handles salt generation and storage
     * 
     * @return PasswordEncoder instance for password hashing and verification
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
