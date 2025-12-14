import axios from 'axios';

// Backend API base URL
const API_URL = 'http://localhost:8080/api/auth';

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
            error: error.response?.data?.error || error.message || 'Registration failed'
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
            error: error.response?.data?.error || error.message || 'Registration failed'
        };
    }
};

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
            error: error.response?.data?.error || error.message || 'Login failed'
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
            error: error.response?.data?.error || error.message || 'Login failed'
        };
    }
};

/**
 * Logout current user
 */
export const logout = () => {
    localStorage.removeItem('user');
    setupAxiosInterceptors(null);
};

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
