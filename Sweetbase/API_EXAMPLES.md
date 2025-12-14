# 📚 API Examples and Integration Guide

Detailed examples for integrating the Sweet Shop Authentication Service with various clients.

## 📋 Table of Contents
- [cURL Examples](#curl-examples)
- [JavaScript/React Examples](#javascriptreact-examples)
- [Axios Configuration](#axios-configuration)
- [Error Handling](#error-handling)
- [Complete React Auth Integration](#complete-react-auth-integration)

---

## 🔧 cURL Examples

### 1. Register Admin

```bash
curl -X POST http://localhost:8080/api/auth/register/admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Super Admin",
    "email": "admin@sweetshop.com",
    "password": "SecureAdmin123",
    "role": "admin"
  }'
```

**Success Response (201):**
```json
{
  "message": "Admin registered successfully!"
}
```

**Error Response (400):**
```json
{
  "error": "Admin already exists with email: admin@sweetshop.com"
}
```

---

### 2. Register User

```bash
curl -X POST http://localhost:8080/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@sweetshop.com",
    "password": "SecureUser123",
    "role": "user"
  }'
```

---

### 3. Admin Login

```bash
curl -X POST http://localhost:8080/api/auth/login/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sweetshop.com",
    "password": "SecureAdmin123",
    "role": "admin"
  }'
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzd2VldHNob3AuY29tIiwicm9sZSI6IlJPTEVfQURNSU4ifQ.xyz",
  "role": "ROLE_ADMIN",
  "email": "admin@sweetshop.com",
  "name": "Super Admin",
  "id": 1
}
```

---

### 4. User Login

```bash
curl -X POST http://localhost:8080/api/auth/login/user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@sweetshop.com",
    "password": "SecureUser123",
    "role": "user"
  }'
```

---

### 5. Access Admin Endpoint (Protected)

```bash
curl -X GET http://localhost:8080/api/admin/test \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
{
  "message": "Admin access granted!",
  "role": "ROLE_ADMIN"
}
```

**Error Response (403 - Wrong Role):**
```json
{
  "error": "Access Denied"
}
```

---

### 6. Access User Endpoint (Protected)

```bash
curl -X GET http://localhost:8080/api/user/test \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## ⚛️ JavaScript/React Examples

### Complete Auth Service (authService.js)

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';
const ADMIN_API = 'http://localhost:8080/api/admin';
const USER_API = 'http://localhost:8080/api/user';

// ============================================
// Axios Interceptor Setup
// ============================================

/**
 * Setup axios to automatically include JWT token in headers
 */
export const setupAxiosInterceptors = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

/**
 * Initialize auth from localStorage on app load
 */
export const initializeAuth = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    setupAxiosInterceptors(user.token);
  }
};

// ============================================
// Registration Functions
// ============================================

/**
 * Register a new admin
 */
export const registerAdmin = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/admin`, {
      name,
      email,
      password,
      role: 'admin'
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Registration failed'
    };
  }
};

/**
 * Register a new user
 */
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/user`, {
      name,
      email,
      password,
      role: 'user'
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Registration failed'
    };
  }
};

// ============================================
// Login Functions
// ============================================

/**
 * Admin login
 */
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/admin`, {
      email,
      password,
      role: 'admin'
    });
    
    if (response.data.token) {
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Setup axios headers
      setupAxiosInterceptors(response.data.token);
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed'
    };
  }
};

/**
 * User login
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/user`, {
      email,
      password,
      role: 'user'
    });
    
    if (response.data.token) {
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Setup axios headers
      setupAxiosInterceptors(response.data.token);
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed'
    };
  }
};

// ============================================
// Logout Function
// ============================================

/**
 * Logout current user
 */
export const logout = () => {
  localStorage.removeItem('user');
  setupAxiosInterceptors(null);
};

// ============================================
// User Info Functions
// ============================================

/**
 * Get current logged-in user
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

/**
 * Check if user is logged in
 */
export const isAuthenticated = () => {
  const user = getCurrentUser();
  return user !== null && user.token !== undefined;
};

/**
 * Check if user is admin
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'ROLE_ADMIN';
};

/**
 * Check if user is regular user
 */
export const isRegularUser = () => {
  const user = getCurrentUser();
  return user && user.role === 'ROLE_USER';
};

// ============================================
// Protected API Call Examples
// ============================================

/**
 * Test admin endpoint
 */
export const testAdminAccess = async () => {
  try {
    const response = await axios.get(`${ADMIN_API}/test`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Access denied'
    };
  }
};

/**
 * Test user endpoint
 */
export const testUserAccess = async () => {
  try {
    const response = await axios.get(`${USER_API}/test`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Access denied'
    };
  }
};
```

---

## 🎨 Complete React Auth Integration

### 1. Create Auth Context (AuthContext.js)

```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  loginAdmin,
  loginUser,
  registerAdmin,
  registerUser,
  logout as logoutService,
  getCurrentUser,
  isAuthenticated,
  isAdmin,
  initializeAuth
} from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const result = role === 'admin'
      ? await loginAdmin(email, password)
      : await loginUser(email, password);
    
    if (result.success) {
      setUser(result.data);
    }
    return result;
  };

  const register = async (name, email, password, role) => {
    const result = role === 'admin'
      ? await registerAdmin(name, email, password)
      : await registerUser(name, email, password);
    
    return result;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### 2. Login Component Example

```javascript
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password, formData.role);

    if (result.success) {
      // Redirect based on role
      if (result.data.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
```

---

### 3. Protected Route Component

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Usage in App.js:
// <Route path="/admin/*" element={
//   <ProtectedRoute requireAdmin={true}>
//     <AdminDashboard />
//   </ProtectedRoute>
// } />
```

---

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "User already exists with email: user@example.com"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid credentials"
}
```

**403 Forbidden:**
```json
{
  "error": "Access Denied"
}
```

### Error Handling in React

```javascript
const handleApiCall = async () => {
  try {
    const response = await axios.post('/api/auth/login/user', data);
    // Success handling
  } catch (error) {
    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 400:
          setError('Invalid input data');
          break;
        case 401:
          setError('Invalid email or password');
          break;
        case 403:
          setError('Access denied');
          break;
        default:
          setError('An error occurred');
      }
    } else if (error.request) {
      // No response from server
      setError('Cannot connect to server');
    } else {
      setError('An unexpected error occurred');
    }
  }
};
```

---

## 🔐 Token Storage Best Practices

### Option 1: LocalStorage (Current Implementation)
```javascript
// Store token
localStorage.setItem('user', JSON.stringify(userData));

// Retrieve token
const user = JSON.parse(localStorage.getItem('user'));

// Remove token
localStorage.removeItem('user');
```

### Option 2: SessionStorage (More Secure)
```javascript
// Store token (cleared when tab closes)
sessionStorage.setItem('user', JSON.stringify(userData));
```

### Option 3: HTTP-Only Cookies (Most Secure - Backend Required)
Requires backend changes to set cookies instead of returning token in response.

---

## 📱 Integration with Your Existing React App

Update your `AuthScreen.jsx` to integrate with the backend:

```javascript
import { loginUser, loginAdmin, registerUser, registerAdmin } from '../services/authService';

const handleSignUpSubmit = async (e) => {
  e.preventDefault();
  
  const registerFunc = selectedRole === 'admin' ? registerAdmin : registerUser;
  const result = await registerFunc(
    formData.username,
    formData.email,
    formData.password
  );
  
  if (result.success) {
    alert('Registration successful! Please login.');
    setIsSignIn(true);
  } else {
    alert(result.error);
  }
};

const handleSignInSubmit = async (e) => {
  e.preventDefault();
  
  const loginFunc = selectedRole === 'admin' ? loginAdmin : loginUser;
  const result = await loginFunc(formData.email, formData.password);
  
  if (result.success) {
    onSignIn(result.data, result.data.role === 'ROLE_ADMIN');
  } else {
    alert(result.error);
  }
};
```

---

**Happy Integrating! 🚀**
