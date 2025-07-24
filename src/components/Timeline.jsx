import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { timelineEvents, getTimelineStats } from '../data/timelineData';
import './Timeline.css';

const Timeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleEvents, setVisibleEvents] = useState(new Set());
  const [showBackToTop, setShowBackToTop] = useState(false);
  const timelineRef = useRef(null);
  const stats = getTimelineStats();

  const categories = ['all', 'birth', 'milestone', 'family', 'education', 'sports', 'personal', 'career', 'birthday'];
  
  const filteredEvents = selectedCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === selectedCategory);

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      'birth': '👶',
      'milestone': '🎯',
      'family': '👨‍👩‍👧‍👦',
      'education': '🎓',
      'sports': '⚾',
      'personal': '💕',
      'career': '💼',
      'birthday': '🎂'
    };
    return emojiMap[category] || '📅';
  };

  const getCategoryName = (category) => {
    const nameMap = {
      'birth': 'Birth',
      'milestone': 'Milestone',
      'family': 'Family',
      'education': 'Education',
      'sports': 'Sports',
      'personal': 'Personal',
      'career': 'Career',
      'birthday': 'Birthday'
    };
    return nameMap[category] || category;
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => new Set([...prev, entry.target.dataset.eventId]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [filteredEvents]);

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="timeline-page">
      <div className="timeline-container">
        <div className="timeline-header">
          <h1 className="text-gradient">📅 Nathan's Life Timeline</h1>
          <p>Follow Nathan's journey from birth to his 25th birthday!</p>
        </div>

        <div className="timeline-stats">
          <div className="card stats-card">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.totalEvents}</span>
                <span className="stat-label">Total Events</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.years}</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.categories}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-emoji">{getCategoryEmoji(category)}</span>
              <span className="category-name">{getCategoryName(category)}</span>
            </button>
          ))}
        </div>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${visibleEvents.has(event.id) ? 'visible' : ''}`}
              data-event-id={event.id}
            >
              <div className="timeline-content">
                <div className="timeline-marker">
                  <div className="marker-emoji">{event.emoji}</div>
                  <div className="marker-year">{event.year}</div>
                </div>
                
                <div className="timeline-card">
                  <div className="event-header">
                    <h3 className="event-title">{event.title}</h3>
                    <span className="event-age">Age {event.age}</span>
                  </div>
                  
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-footer">
                    <div className="event-category">
                      <span className="category-tag">
                        {getCategoryEmoji(event.category)} {getCategoryName(event.category)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-summary">
          <div className="card summary-card">
            <h3 className="text-gradient">🎉 Nathan's Journey</h3>
            <p>
              From a tiny baby in Chicago to a successful 25-year-old data analyst, Nathan has accomplished so much! 
              His love for sports, running, and his family has shaped him into the amazing person he is today.
            </p>
            <div className="journey-highlights">
              <div className="highlight">
                <span className="highlight-emoji">⚾</span>
                <span className="highlight-text">Cubs fan since birth</span>
              </div>
              <div className="highlight">
                <span className="highlight-emoji">🏃‍♂️</span>
                <span className="highlight-text">Avid runner</span>
              </div>
              <div className="highlight">
                <span className="highlight-emoji">💕</span>
                <span className="highlight-text">Found love with Rina</span>
              </div>
              <div className="highlight">
                <span className="highlight-emoji">💼</span>
                <span className="highlight-text">Successful career</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Timeline; 