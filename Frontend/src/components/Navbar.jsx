import React from 'react';
import '../styles/Navbar.css';

export const Navbar = ({ currentUser, isAdmin, onNavigate, currentScreen, onLogout, searchQuery, onSearchChange, selectedCategory, onCategoryChange, categories = [] }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <span className="brand-icon">🍭</span>
          <h1 className="brand-name">Sweet Shop</h1>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search sweets..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Category Dropdown */}
        <div className="navbar-filter">
          <select
            className="category-select"
            value={selectedCategory || 'All'}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* User Info */}
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-avatar">👤</span>
            <div className="user-details">
              <p className="user-name">{currentUser?.name || currentUser?.username || 'Guest'}</p>
              <p className="user-role">{isAdmin ? 'Admin' : 'Customer'}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
