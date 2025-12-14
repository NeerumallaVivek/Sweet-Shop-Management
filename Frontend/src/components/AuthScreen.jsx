import React, { useState } from 'react';
import '../styles/AuthScreen.css';
import { registerAdmin, registerUser, loginAdmin, loginUser } from '../services/authService';

// Import Sweet Images for Showcase
import rasmalaiImg from '../assets/Images/Rasmalai.jfif';
import gulabjamunImg from '../assets/Images/Gulabjamun.jfif';
import kajukatliImg from '../assets/Images/Kajukatli.jfif';
import chocolateBarfiImg from '../assets/Images/Chocolate_Barfi.jfif';
import rasgullaImg from '../assets/Images/Rasgulla.jpeg';
import dryFruitLadduImg from '../assets/Images/DryFruit_Laddu.jfif';

export const AuthScreen = ({ onSignIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [selectedRole, setSelectedRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Call backend API based on role
      const loginFunc = selectedRole === 'admin' ? loginAdmin : loginUser;
      const result = await loginFunc(formData.email, formData.password);

      if (result.success) {
        // Store user data and call parent onSignIn
        const isAdmin = result.data.role === 'ROLE_ADMIN';
        onSignIn(result.data, isAdmin);
        setSuccessMessage('Login successful!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Call backend API based on role
      const registerFunc = selectedRole === 'admin' ? registerAdmin : registerUser;
      const result = await registerFunc(formData.username, formData.email, formData.password);

      if (result.success) {
        setSuccessMessage(result.data.message || 'Registration successful! Please login.');
        // Clear form and switch to sign in
        setFormData({ email: '', password: '', username: '' });
        setTimeout(() => {
          setIsSignIn(true);
          setSuccessMessage('');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const showcaseSweets = [
    { id: 1, name: 'Rasmalai', image: rasmalaiImg },
    { id: 2, name: 'Gulab Jamun', image: gulabjamunImg },
    { id: 3, name: 'Kaju Katli', image: kajukatliImg },
    { id: 4, name: 'Chocolate Barfi', image: chocolateBarfiImg },
    { id: 5, name: 'Rasgulla', image: rasgullaImg },
    { id: 6, name: 'Dry Fruit Laddu', image: dryFruitLadduImg },
  ];

  return (
    <>
      <div className="auth-container">
        {/* Background with overlay */}
        <div className="auth-background"></div>
        <div className="auth-overlay"></div>

        <div className="login-hero-wrapper">

          {/* Left Side: Welcome Message (Moved here) */}
          <div className="auth-message-container">
            <div className="text-content">
              <h1 className="welcome-title brand-title">Sweet Shop</h1>
              <h1 className="welcome-title">Where Every Bite Feels Like Home</h1>
              <p className="welcome-quote">
                Family
                Authentic sweets prepared with love and purity, celebrating togetherness in every celebration.
              </p>
              <div className="social-icons">
                {/* Placeholders for icons if needed later, using text for now or simple circles */}
                <span className="icon-dot"></span>
                <span className="icon-dot"></span>
                <span className="icon-dot"></span>
              </div>
            </div>
          </div>

          {/* Right Side: Glass Form Card */}
          <div className="glass-card">
            {/* Glowing gradient outline effect */}
            <div className="card-glow"></div>

            {/* Header for Form */}


            {/* Tab Navigation (Keep existing logic but styled differently if needed, keeping simple for now) */}
            <div className="auth-tabs">
              <button
                className={`tab-button ${isSignIn ? 'active' : ''}`}
                onClick={() => {
                  setIsSignIn(true);
                  setFormData({ email: '', password: '', username: '' });
                }}
              >
                Sign In
              </button>
              <button
                className={`tab-button ${!isSignIn ? 'active' : ''}`}
                onClick={() => {
                  setIsSignIn(false);
                  setFormData({ email: '', password: '', username: '' });
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
                {/* ... existing fields ... */}
                <div className="form-group">
                  <label htmlFor="signup-username" className="form-label">Username</label>
                  <input type="text" id="signup-username" name="username" className="form-input" placeholder="Choose a username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-email" className="form-label">Email Address</label>
                  <input type="email" id="signup-email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password" className="form-label">Password</label>
                  <input type="password" id="signup-password" name="password" className="form-input" placeholder="Create a strong password" value={formData.password} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Registering...' : 'Sign In now'}
                </button>
              </form>
            )}

            {/* Sign In Form */}
            {isSignIn && (
              <form className="auth-form sign-in-form" onSubmit={handleSignInSubmit}>

                {/* Error and Success Messages */}
                {error && <div className="auth-alert error">{error}</div>}
                {successMessage && <div className="auth-alert success">{successMessage}</div>}

                <div className="form-group">
                  <label htmlFor="signin-email" className="form-label">Email Address</label>
                  <input type="email" id="signin-email" name="email" className="form-input" placeholder="" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="signin-password" className="form-label">Password</label>
                  <input type="password" id="signin-password" name="password" className="form-input" placeholder="" value={formData.password} onChange={handleInputChange} required />
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" /> Remember Me
                  </label>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign in now'}
                </button>

                <a href="#" className="forgot-password-link">Lost your password?</a>

                <div className="legal-footer">
                  By clicking on "Sign in now" you agree to <br />
                  <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sweets Showcase Section */}
        <div className="sweets-showcase-section">
          <h2 className="showcase-title">Our Signature Delights</h2>
          <div className="sweets-slider-container">
            {showcaseSweets.map((sweet) => (
              <div key={sweet.id} className="sweet-showcase-card">
                <div className="sweet-image-wrapper">
                  <img src={sweet.image} alt={sweet.name} className="sweet-showcase-img" />
                </div>
                <h3 className="sweet-showcase-name">{sweet.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
