import React, { useState } from 'react';
import '../styles/AuthScreen.css';

export const AuthScreen = ({ onSignIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [selectedRole, setSelectedRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Call the parent component's onSignIn with user data and admin status
    const isAdmin = selectedRole === 'admin';
    onSignIn(
      { email: formData.email, username: formData.email.split('@')[0], role: selectedRole },
      isAdmin
    );
    console.log('Sign In:', { email: formData.email, password: formData.password, role: selectedRole });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Call the parent component's onSignIn with new user data
    const isAdmin = selectedRole === 'admin';
    onSignIn(
      { email: formData.email, username: formData.username, role: selectedRole },
      isAdmin
    );
    console.log('Sign Up:', {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: selectedRole,
    });
  };

  return (
    <div className="auth-container">
      {/* Background with overlay */}
      <div className="auth-background"></div>
      <div className="auth-overlay"></div>

      {/* Glass morphism card */}
      <div className="glass-card">
        {/* Glowing gradient outline effect */}
        <div className="card-glow"></div>

        {/* Tab Navigation */}
        <div className="auth-tabs">
          <button
            className={`tab-button ${isSignIn ? 'active' : ''}`}
            onClick={() => {
              setIsSignIn(true);
              setFormData({ email: '', password: '', confirmPassword: '', username: '' });
            }}
          >
            Sign In
          </button>
          <button
            className={`tab-button ${!isSignIn ? 'active' : ''}`}
            onClick={() => {
              setIsSignIn(false);
              setFormData({ email: '', password: '', confirmPassword: '', username: '' });
            }}
          >
            Sign Up
          </button>
          <div className={`tab-indicator ${isSignIn ? 'sign-in' : 'sign-up'}`}></div>
        </div>

        {/* Role Selection Buttons */}
        <div className="role-selection">
          <button
            type="button"
            className={`role-button ${selectedRole === 'user' ? 'active' : ''}`}
            onClick={() => setSelectedRole('user')}
          >
            <span className="role-icon">👤</span>
            <span className="role-label">User</span>
          </button>
          <button
            type="button"
            className={`role-button ${selectedRole === 'admin' ? 'active' : ''}`}
            onClick={() => setSelectedRole('admin')}
          >
            <span className="role-icon">👨‍💼</span>
            <span className="role-label">Admin</span>
          </button>
        </div>

        {/* Sign Up Form */}
        {!isSignIn && (
          <form className="auth-form sign-up-form" onSubmit={handleSignUpSubmit}>
            <h2 className="form-title">
              {selectedRole === 'admin' ? '👨‍💼' : '👤'} {selectedRole === 'admin' ? 'Admin' : 'User'} Registration
            </h2>

            <div className="form-group">
              <label htmlFor="signup-username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="signup-username"
                name="username"
                className="form-input"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="signup-email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="signup-confirm"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
        )}
        {/* Sign In Form */}
        {isSignIn && (
          <form className="auth-form sign-in-form" onSubmit={handleSignInSubmit}>
            <h2 className="form-title">
              {selectedRole === 'admin' ? '👨‍💼' : '👤'} {selectedRole === 'admin' ? 'Admin' : 'User'} Sign In
            </h2>

            <div className="form-group">
              <label htmlFor="signin-email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="signin-email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signin-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="signin-password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>
        )}

        
      </div>
    </div>
  );
};

export default AuthScreen;
