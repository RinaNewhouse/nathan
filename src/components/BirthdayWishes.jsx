import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { birthdayWishes, addWish, getWishesStats } from '../data/wishesData';
import './BirthdayWishes.css';

const BirthdayWishes = () => {
  const [wishes, setWishes] = useState(birthdayWishes);
  const [newWish, setNewWish] = useState({
    name: '',
    message: '',
    emoji: '🎂'
  });

  const [showForm, setShowForm] = useState(false);

  const emojiOptions = ['🎂', '🎉', '🎈', '🎊', '🎁', '💝', '💕', '💖', '🌟', '⭐', '🎮', '🍕', '🍣', '☕', '📚', '🎵', '🏖️', '🗾', '⚾', '🏃‍♂️', '💼', '🎓', '🇮🇱', '✈️'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newWish.name.trim() && newWish.message.trim()) {
      const wish = {
        id: Date.now(),
        ...newWish,
        timestamp: new Date().toISOString().split('T')[0]
      };
      addWish(wish);
      setWishes([...birthdayWishes]); // Refresh the list
      setNewWish({ name: '', message: '', emoji: '🎂' });
      setShowForm(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewWish(prev => ({ ...prev, [field]: value }));
  };

  const stats = getWishesStats();

  return (
    <div className="wishes-page">
      <div className="wishes-container">
        <div className="wishes-header">
          <h1>💝 Birthday Wishes for Nathan</h1>
          <p>Leave a special message for Nathan on his 25th birthday!</p>
        </div>

        <div className="add-wish-section">
          <button 
            className="add-wish-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '✍️ Add Your Wish'}
          </button>

          {showForm && (
            <form className="wish-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name:</label>
                <input
                  type="text"
                  value={newWish.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Choose an Emoji:</label>
                <div className="emoji-picker">
                  {emojiOptions.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      className={`emoji-option ${newWish.emoji === emoji ? 'selected' : ''}`}
                      onClick={() => handleInputChange('emoji', emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Message:</label>
                <textarea
                  value={newWish.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Write your birthday wish for Nathan..."
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="submit-wish-btn">
                💝 Send Wish
              </button>
            </form>
          )}
        </div>

        {wishes.length === 0 ? (
          <div className="no-wishes-message">
            <div className="empty-state">
              <div className="empty-emoji">💝</div>
              <h3>No wishes yet!</h3>
              <p>Be the first to leave a birthday wish for Nathan!</p>
            </div>
          </div>
        ) : (
          <div className="wishes-grid">
            {wishes.map(wish => (
              <div key={wish.id} className="wish-card">
                <div className="wish-header">
                  <div className="wish-emoji">{wish.emoji}</div>
                  <div className="wish-info">
                    <h3 className="wish-name">{wish.name}</h3>
                    <span className="wish-date">{wish.timestamp}</span>
                  </div>
                </div>
                <div className="wish-message">
                  <p>{wish.message}</p>
                </div>
                <div className="wish-footer">
                  <span className="wish-heart">💖</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="wishes-stats">
          <div className="stats-card">
            <h3>📊 Wishes Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.totalWishes}</span>
                <span className="stat-label">Total Wishes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.uniquePeople}</span>
                <span className="stat-label">{stats.peopleLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWishes; 