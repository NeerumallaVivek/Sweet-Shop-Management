import React, { useState, useMemo } from 'react'
import AuthScreen from './components/AuthScreen'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(true)
  const [currentScreen, setCurrentScreen] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null)

  // Dashboard state for filtering
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Categories for the dropdown
  const categories = ['All', 'Traditional Sweets', 'Chocolate Sweets', 'Dry Fruit Sweets', 'Milk-Based Sweets'];

  const handleSignIn = (userData, adminStatus = true) => {
    setCurrentUser(userData)
    setIsAdmin(adminStatus)
    setIsAuthenticated(true)
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setIsAdmin(false)
    setCurrentScreen('dashboard')
  }

  const handleNavigate = (screen) => {
    setCurrentScreen(screen)
  }

  if (!isAuthenticated) {
    return <AuthScreen onSignIn={handleSignIn} />
  }

  return (
    <div className="app">
      <Navbar
        currentUser={currentUser}
        isAdmin={isAdmin}
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      {currentScreen === 'dashboard' && (
        <Dashboard
          isAdmin={isAdmin}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          currentUser={currentUser}
        />
      )}
    </div>
  )
}

export default App