package com.sweetshop.auth.service;

import com.sweetshop.auth.entity.Admin;
import com.sweetshop.auth.entity.User;
import com.sweetshop.auth.repository.AdminRepository;
import com.sweetshop.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

/**
 * Custom UserDetailsService Implementation
 * Loads user/admin details from database for Spring Security authentication
 * Searches both Admin and User tables
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Load user by email (username)
     * Searches both Admin and User tables
     * 
     * @param email Email address (used as username)
     * @return UserDetails object with email, password, and role
     * @throws UsernameNotFoundException if user/admin not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First, try to find in Admin table
        Optional<Admin> adminOptional = adminRepository.findByAdminEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            return new org.springframework.security.core.userdetails.User(
                    admin.getAdminEmail(),
                    admin.getAdminPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        }

        // If not found in Admin table, try User table
        Optional<User> userOptional = userRepository.findByUserEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new org.springframework.security.core.userdetails.User(
                    user.getUserEmail(),
                    user.getUserPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        }

        // If not found in either table, throw exception
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
