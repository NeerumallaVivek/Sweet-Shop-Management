# 🍬 Sweet Shop Authentication Service

A production-ready Spring Boot authentication service with JWT-based authentication, BCrypt password encryption, and role-based access control for Sweet Shop Management System.

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [React Integration](#react-integration)
- [Security Features](#security-features)
- [Testing](#testing)

## ✨ Features

- **JWT Authentication**: Secure token-based authentication
- **BCrypt Encryption**: Industry-standard password hashing
- **Role-Based Access Control**: Separate ADMIN and USER roles
- **MySQL Database**: Persistent data storage
- **CORS Enabled**: Ready for React frontend integration
- **Input Validation**: Request validation using Jakarta Validation
- **RESTful API**: Clean and well-documented endpoints
- **Stateless Sessions**: No server-side session management

## 🛠 Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Spring Security**: JWT-based authentication
- **Spring Data JPA**: Database operations
- **MySQL**: Database
- **JWT (jjwt)**: 0.12.3
- **Lombok**: Reduce boilerplate code
- **Maven**: Build tool

## 📦 Prerequisites

Before running this application, ensure you have:

1. **Java 17 or higher** installed
2. **MySQL Server** running
3. **Maven** installed
4. **Git** (optional, for cloning)

## 📁 Project Structure

```
Sweetbase/
├── src/main/java/com/sweetshop/auth/
│   ├── config/
│   │   ├── SecurityConfig.java          # Spring Security configuration
│   │   ├── JwtAuthenticationFilter.java # JWT token validation filter
│   │   ├── JwtUtil.java                 # JWT utility methods
│   │   └── PasswordConfig.java          # BCrypt password encoder
│   ├── controller/
│   │   └── AuthController.java          # REST API endpoints
│   ├── dto/
│   │   ├── LoginRequest.java            # Login request DTO
│   │   ├── RegisterRequest.java         # Registration request DTO
│   │   └── AuthResponse.java            # Authentication response DTO
│   ├── entity/
│   │   ├── Admin.java                   # Admin entity
│   │   └── User.java                    # User entity
│   ├── repository/
│   │   ├── AdminRepository.java         # Admin repository
│   │   └── UserRepository.java          # User repository
│   ├── service/
│   │   ├── AuthService.java             # Authentication service
│   │   └── CustomUserDetailsService.java # Spring Security UserDetailsService
│   └── SweetShopAuthApplication.java    # Main application
├── src/main/resources/
│   └── application.properties           # Application configuration
└── pom.xml                              # Maven dependencies
```

## 🚀 Setup Instructions

### 1. Configure MySQL Database

First, update the database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sweetshop_db?createDatabaseIfNotExist=true
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 2. Build the Project

Navigate to the project directory and run:

```bash
cd Sweetbase
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Verify Startup

You should see the following message:

```
============================================================
Sweet Shop Authentication Service Started Successfully!
Server running on: http://localhost:8080
API Base URL: http://localhost:8080/api/auth
============================================================
```

## 🗄 Database Schema

The application automatically creates the following tables:

### `admins` Table

| Column         | Type          | Constraints                    |
|----------------|---------------|--------------------------------|
| admin_id       | INT           | PRIMARY KEY, AUTO_INCREMENT    |
| admin_name     | VARCHAR(100)  | NOT NULL                       |
| admin_email    | VARCHAR(150)  | NOT NULL, UNIQUE               |
| admin_password | VARCHAR(255)  | NOT NULL (BCrypt hash)         |

### `users` Table

| Column         | Type          | Constraints                    |
|----------------|---------------|--------------------------------|
| user_id        | INT           | PRIMARY KEY, AUTO_INCREMENT    |
| user_name      | VARCHAR(100)  | NOT NULL                       |
| user_email     | VARCHAR(150)  | NOT NULL, UNIQUE               |
| user_password  | VARCHAR(255)  | NOT NULL (BCrypt hash)         |

## 🌐 API Endpoints

### Authentication Endpoints (Public)

#### 1. Register Admin
```
POST /api/auth/register/admin
Content-Type: application/json

Request Body:
{
  "name": "John Admin",
  "email": "admin@sweetshop.com",
  "password": "admin123",
  "role": "admin"
}

Response (201 Created):
{
  "message": "Admin registered successfully!"
}
```

#### 2. Register User
```
POST /api/auth/register/user
Content-Type: application/json

Request Body:
{
  "name": "Jane User",
  "email": "user@sweetshop.com",
  "password": "user123",
  "role": "user"
}

Response (201 Created):
{
  "message": "User registered successfully!"
}
```

#### 3. Admin Login
```
POST /api/auth/login/admin
Content-Type: application/json

Request Body:
{
  "email": "admin@sweetshop.com",
  "password": "admin123",
  "role": "admin"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "ROLE_ADMIN",
  "email": "admin@sweetshop.com",
  "name": "John Admin",
  "id": 1
}
```

#### 4. User Login
```
POST /api/auth/login/user
Content-Type: application/json

Request Body:
{
  "email": "user@sweetshop.com",
  "password": "user123",
  "role": "user"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "ROLE_USER",
  "email": "user@sweetshop.com",
  "name": "Jane User",
  "id": 1
}
```

### Protected Endpoints (Require JWT)

#### 5. Admin Test Endpoint
```
GET /api/admin/test
Authorization: Bearer <jwt-token>

Response (200 OK):
{
  "message": "Admin access granted!",
  "role": "ROLE_ADMIN"
}
```

#### 6. User Test Endpoint
```
GET /api/user/test
Authorization: Bearer <jwt-token>

Response (200 OK):
{
  "message": "User access granted!",
  "role": "ROLE_USER"
}
```

## ⚛️ React Integration

### 1. Install Axios

```bash
npm install axios
```

### 2. Create Auth Service

Create `src/services/authService.js`:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Configure axios to include token in all requests
const setupAxiosInterceptors = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Register Admin
export const registerAdmin = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register/admin`, {
    name,
    email,
    password,
    role: 'admin'
  });
  return response.data;
};

// Register User
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register/user`, {
    name,
    email,
    password,
    role: 'user'
  });
  return response.data;
};

// Login Admin
export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_URL}/login/admin`, {
    email,
    password,
    role: 'admin'
  });
  
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
    setupAxiosInterceptors(response.data.token);
  }
  
  return response.data;
};

// Login User
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login/user`, {
    email,
    password,
    role: 'user'
  });
  
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
    setupAxiosInterceptors(response.data.token);
  }
  
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('user');
  setupAxiosInterceptors(null);
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    setupAxiosInterceptors(userData.token);
    return userData;
  }
  return null;
};

export { setupAxiosInterceptors };
```

### 3. Usage Example in React Component

```javascript
import React, { useState } from 'react';
import { loginUser, registerUser } from './services/authService';

function AuthComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      console.log('Registration successful:', response);
      alert(response.message);
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password);
      console.log('Login successful:', response);
      alert('Login successful! Token: ' + response.token);
      // Redirect to dashboard or home page
    } catch (error) {
      console.error('Login error:', error.response?.data);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      {/* Your form JSX here */}
    </div>
  );
}

export default AuthComponent;
```

## 🔒 Security Features

1. **JWT Token Security**
   - Tokens expire after 24 hours (configurable)
   - Signed using HS256 algorithm
   - Contains user ID, email, and role

2. **Password Security**
   - BCrypt hashing with salt
   - Passwords never stored in plain text
   - Minimum 6 characters required

3. **Role-Based Access Control**
   - `ROLE_ADMIN`: Access to admin endpoints
   - `ROLE_USER`: Access to user endpoints
   - Unauthorized access returns 403 Forbidden

4. **CORS Configuration**
   - Configured for React frontend
   - Allows credentials
   - Supports all HTTP methods

5. **Request Validation**
   - Email format validation
   - Password strength requirements
   - Required field validation

## 🧪 Testing

### Using cURL

**Register Admin:**
```bash
curl -X POST http://localhost:8080/api/auth/register/admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","password":"admin123","role":"admin"}'
```

**Login Admin:**
```bash
curl -X POST http://localhost:8080/api/auth/login/admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123","role":"admin"}'
```

**Access Protected Endpoint:**
```bash
curl -X GET http://localhost:8080/api/admin/test \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints
2. Set `Content-Type: application/json` header
3. For protected endpoints, add `Authorization: Bearer <token>` header
4. Test each endpoint with sample data

## 📝 Configuration Options

### JWT Configuration (application.properties)

```properties
# JWT Secret Key (change in production!)
jwt.secret=YOUR_SECRET_KEY_HERE

# Token expiration (in milliseconds)
# 24 hours = 86400000
jwt.expiration=86400000
```

### CORS Configuration

Update `SecurityConfig.java` to change allowed origins:

```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",  // Vite
    "http://localhost:3000"   // Create React App
));
```

## 🎯 Next Steps

1. **Add Email Verification**: Implement email verification for registration
2. **Password Reset**: Add forgot password functionality
3. **Refresh Tokens**: Implement refresh token mechanism
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Audit Logging**: Log all authentication attempts
6. **Two-Factor Authentication**: Add 2FA for enhanced security

## 📄 License

This project is part of the Sweet Shop Management System.

## 👥 Support

For issues or questions, please contact the development team.

---

**Happy Coding! 🍬**
