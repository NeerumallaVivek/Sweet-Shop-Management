package com.sweetshop.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Security Configuration
 * Configures Spring Security with JWT authentication
 * Enables CORS for React frontend integration
 * Defines role-based access control for endpoints
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        @Autowired
        private JwtAuthenticationFilter jwtAuthenticationFilter;

        /**
         * Configure Security Filter Chain
         * Defines which endpoints are public and which require authentication
         * 
         * @param http HttpSecurity object
         * @return SecurityFilterChain
         * @throws Exception if configuration fails
         */
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                // Disable CSRF (not needed for stateless JWT authentication)
                                .csrf(csrf -> csrf.disable())

                                // Enable CORS
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                                // Configure authorization rules
                                .authorizeHttpRequests(auth -> auth
                                                // Public endpoints - authentication not required
                                                .requestMatchers(
                                                                "/api/auth/register/**",
                                                                "/api/auth/login/**",
                                                                "/api/sweets", // Allow public view of sweets
                                                                "/api/files/upload", // Allow file upload
                                                                "/uploads/**") // Allow access to uploaded files
                                                .permitAll()

                                                // Admin-only endpoints
                                                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                                                // User-only endpoints
                                                .requestMatchers("/api/user/**").hasAuthority("ROLE_USER")

                                                // All other requests require authentication
                                                .anyRequest().authenticated())

                                // Set session management to stateless (no sessions, using JWT)
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                                // Add JWT filter before UsernamePasswordAuthenticationFilter
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        /**
         * CORS Configuration
         * Allows React frontend to make requests to this backend
         * 
         * @return CorsConfigurationSource
         */
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                // Allow requests from React frontend (Vite default port)
                // Update this URL if your frontend runs on a different port
                configuration.setAllowedOrigins(List.of(
                                "http://localhost:5173",
                                "http://localhost:3000"));

                // Allow all HTTP methods
                configuration.setAllowedMethods(Arrays.asList(
                                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

                // Allow all headers
                configuration.setAllowedHeaders(Arrays.asList(
                                "Authorization", "Content-Type", "Accept"));

                // Allow credentials (cookies, authorization headers)
                configuration.setAllowCredentials(true);

                // Apply CORS configuration to all endpoints
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);

                return source;
        }

        /**
         * Authentication Manager Bean
         * Required for authentication
         * 
         * @param config AuthenticationConfiguration
         * @return AuthenticationManager
         * @throws Exception if configuration fails
         */
        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }
}
