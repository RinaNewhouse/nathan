import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [clickCount, setClickCount] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Add initial confetti on page load
    const initialConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -50, // Start from above the viewport
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2, // Positive velocity to fall down
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#ff8b94'][Math.floor(Math.random() * 8)],
      size: Math.random() * 12 + 8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
    }));
    
    setConfetti(initialConfetti);
    
    // Remove initial confetti after animation
    setTimeout(() => {
      setConfetti([]);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleCakeClick = () => {
    setClickCount(prev => prev + 1);
    
    // Create confetti burst across entire screen
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -50, // Start from above the viewport like initial confetti
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2, // Fall down naturally
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#ff8b94'][Math.floor(Math.random() * 8)],
      size: Math.random() * 12 + 8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
    }));
    
    setConfetti(prev => [...prev, ...newConfetti]);
    
    // Remove confetti after animation
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.find(nc => nc.id === c.id)));
    }, 4000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="home-page">
      {/* Confetti Animation */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className={`confetti-particle confetti-${particle.shape}`}
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            transform: `translate(${particle.vx * 2}px, ${particle.vy * 2}px) rotate(${particle.rotation}deg)`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-balloon balloon-1">🎈</div>
        <div className="floating-balloon balloon-2">🎈</div>
        <div className="floating-balloon balloon-3">🎈</div>
        <div className="floating-star star-1">⭐</div>
        <div className="floating-star star-2">⭐</div>
        <div className="floating-star star-3">⭐</div>
      </div>

      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content animate-fade-in-up">
            <div className="birthday-cake" onClick={handleCakeClick}>
              <div className="cake-layers">
                <div className="cake-layer layer-1"></div>
                <div className="cake-layer layer-2"></div>
                <div className="cake-layer layer-3"></div>
              </div>
              <div className="candles">
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="candle"></div>
              </div>
              <div className="flames">
                <div className="flame"></div>
                <div className="flame"></div>
                <div className="flame"></div>
                <div className="flame"></div>
                <div className="flame"></div>
              </div>
            </div>
            
            <h1 className="hero-title">
              <span className="text-gradient">Happy</span>
              <br />
              <span className="text-gradient">25th Birthday</span>
              <br />
              <span className="text-gradient">Nathan!</span>
            </h1>
            
            <p className="hero-subtitle">
              Today is your special day! 🎉
            </p>
            
            <div className="click-counter">
              <p>You've clicked {clickCount} times!</p>
              <small>Click the cake for more confetti!</small>
            </div>
          </div>
        </section>

        {/* Live Clock */}
        <section className="clock-section">
          <div className="card clock-card">
            <div className="clock-content">
              <div className="time-display">
                <span className="time">{formatTime(currentTime)}</span>
              </div>
              <div className="date-display">
                <span className="date">{formatDate(currentTime)}</span>
              </div>
              <div className="birthday-countdown">
                <span className="countdown-text">Nathan's 25th Birthday</span>
                <span className="countdown-emoji">🎂</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="navigation-section">
          <div className="nav-grid">
            <Link to="/quiz" className="nav-card">
              <span className="nav-card-icon">❓</span>
              <h3>How Well Do You Know Nathan?</h3>
              <p>Test your knowledge with our fun quiz!</p>
              <span className="nav-card-arrow">→</span>
            </Link>
            
            <Link to="/gallery" className="nav-card">
              <span className="nav-card-icon">📸</span>
              <h3>Photo Gallery</h3>
              <p>Take a look at Nathan's amazing moments!</p>
              <span className="nav-card-arrow">→</span>
            </Link>
            
            <Link to="/facts" className="nav-card">
              <span className="nav-card-icon">💡</span>
              <h3>Nathan Facts</h3>
              <p>Discover amazing things about Nathan!</p>
              <span className="nav-card-arrow">→</span>
            </Link>
            
            <Link to="/wishes" className="nav-card">
              <span className="nav-card-icon">💝</span>
              <h3>Birthday Wishes</h3>
              <p>Leave a special message for Nathan!</p>
              <span className="nav-card-arrow">→</span>
            </Link>
            
            <Link to="/timeline" className="nav-card">
              <span className="nav-card-icon">📅</span>
              <h3>Life Timeline</h3>
              <p>Follow Nathan's journey from birth to 25!</p>
              <span className="nav-card-arrow">→</span>
            </Link>
            
            <div className="nav-card special-card">
              <span className="nav-card-icon">🎁</span>
              <h3>25 Years of Awesome!</h3>
              <p>What a journey!</p>
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-number">25</span>
                  <span className="stat-label">YEARS</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4-6</span>
                  <span className="stat-label">MILES DAILY</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">⚾</span>
                  <span className="stat-label">CUBS FAN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Birthday Message */}
        <section className="message-section">
          <div className="card message-card">
            <div className="message-content">
              <h2 className="text-gradient">Happy 25th Birthday, Nathan!</h2>
              <p>
                From running sub-5 minute miles to cheering on the Cubs, from UIUC to GEICO, 
                you've accomplished so much in your first quarter century! I'm honored to have been there for a fifth of it so far. Here's to many more 
                years of amazing adventures, delicious Brazilian food, and daily yogurt routines. 🎉
              </p>
              <div className="message-signature">
                <span>With love,</span>
                <span className="signature">Rina and everyone who who luvs u :D</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 