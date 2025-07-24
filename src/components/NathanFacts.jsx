import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { nathanFacts, addFact } from '../data/factsData';
import './NathanFacts.css';

const NathanFacts = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [facts, setFacts] = useState(nathanFacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFact, setNewFact] = useState({
    category: 'Personality',
    fact: '',
    emoji: '😊',
    detail: '',
    addedBy: ''
  });

  const categories = [
    'Personality', 'Sports', 'Running', 'Food', 'Daily Routine', 
    'Food Paradoxes', 'Career', 'Education', 'Family', 'Relationship', 
    'Entertainment', 'Travel'
  ];

  const emojiOptions = ['😊', '⚾', '🏃‍♂️', '🍽️', '🥤', '🤔', '💼', '🎓', '👨‍👩‍👧‍👦', '💕', '⭐', '🎧', '✈️', '🎮', '📚', '🎵', '🏖️', '🗾', '🇮🇱', '🎉'];

  const toggleCard = (id) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFact.fact.trim() && newFact.detail.trim() && newFact.addedBy.trim()) {
      addFact(newFact);
      setFacts([...nathanFacts]); // Refresh the list
      setNewFact({
        category: 'Personality',
        fact: '',
        emoji: '😊',
        detail: '',
        addedBy: ''
      });
      setShowAddForm(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewFact(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="facts-page">
      <div className="facts-container">
        <div className="facts-header">
          <h1>💡 Nathan Facts</h1>
          <p>Discover amazing things about Nathan! Click on any card to learn more!</p>
        </div>

        <div className="add-fact-section">
          <button 
            className="add-fact-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ Cancel' : '✍️ Add a Fact'}
          </button>

          {showAddForm && (
            <form className="fact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name:</label>
                <input
                  type="text"
                  value={newFact.addedBy}
                  onChange={(e) => handleInputChange('addedBy', e.target.value)}
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
                      className={`emoji-option ${newFact.emoji === emoji ? 'selected' : ''}`}
                      onClick={() => handleInputChange('emoji', emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Fact:</label>
                <input
                  type="text"
                  value={newFact.fact}
                  onChange={(e) => handleInputChange('fact', e.target.value)}
                  placeholder="Enter a fact about Nathan"
                  required
                />
              </div>

              <div className="form-group">
                <label>Details:</label>
                <textarea
                  value={newFact.detail}
                  onChange={(e) => handleInputChange('detail', e.target.value)}
                  placeholder="Add more details about this fact"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <select
                  value={newFact.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-fact-btn">
                💡 Add Fact
              </button>
            </form>
          )}
        </div>

        <div className="facts-grid">
          {facts.map(fact => (
            <div
              key={fact.id}
              className={`fact-card ${flippedCards.has(fact.id) ? 'flipped' : ''}`}
              onClick={() => toggleCard(fact.id)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="fact-emoji">{fact.emoji}</div>
                  <h3 className="fact-category">{fact.category}</h3>
                  <p className="fact-text">{fact.fact}</p>
                  <div className="flip-hint">Click to learn more!</div>
                  {fact.addedBy && (
                    <div className="fact-author">Added by: {fact.addedBy}</div>
                  )}
                </div>
                <div className="card-back">
                  <div className="detail-emoji">{fact.emoji}</div>
                  <h3 className="detail-category">{fact.category}</h3>
                  <p className="detail-text">{fact.detail}</p>
                  <div className="flip-hint">Click to flip back!</div>
                  {fact.addedBy && (
                    <div className="fact-author">Added by: {fact.addedBy}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fun-message">
          <div className="message-bubble">
            <h3>🎉 Did you learn something new about Nathan?</h3>
            <p>Share these facts with others and spread the Nathan love!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NathanFacts; 