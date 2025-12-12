import React, { useState, useMemo } from 'react'
import AuthScreen from './components/AuthScreen'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import sweetsData from './data/sweets.json'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(true)
  const [currentScreen, setCurrentScreen] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null)

  // Dashboard state for filtering
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Sweets data from JSON
  const [sweets] = useState(sweetsData.sweets)

  const categories = ['All', ...new Set(sweets.map((sweet) => sweet.category))]

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
          sweets={sweets}
        />
      )}
    </div>
  )
}

export default App