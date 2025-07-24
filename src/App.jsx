import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import PhotoGallery from './components/PhotoGallery';
import NathanFacts from './components/NathanFacts';
import BirthdayWishes from './components/BirthdayWishes';
import Timeline from './components/Timeline';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/quiz', label: 'Quiz', icon: '❓' },
    { path: '/gallery', label: 'Gallery', icon: '📸' },
    { path: '/facts', label: 'Facts', icon: '💡' },
    { path: '/wishes', label: 'Wishes', icon: '💝' },
    { path: '/timeline', label: 'Timeline', icon: '📅' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          burgerRef.current &&
          !burgerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-title">
          Nathan's 25th Birthday! 🎂
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Burger Menu */}
        <div className="mobile-nav">
          <button 
            ref={burgerRef}
            className="burger-menu" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
          
          <div 
            className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
            onClick={closeMenu}
          ></div>
          
          <div 
            ref={menuRef}
            className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
          >
            <div className="mobile-menu-header">
              <h3>Navigation</h3>
              <button 
                className="mobile-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/gallery" element={<PhotoGallery />} />
            <Route path="/facts" element={<NathanFacts />} />
            <Route path="/wishes" element={<BirthdayWishes />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
