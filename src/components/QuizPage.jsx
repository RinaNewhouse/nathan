import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { quizQuestions } from '../data/quizData';
import './QuizPage.css';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === quizQuestions[currentQuestion].correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const getResultMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage >= 90) {
      return {
        title: "🎉 Nathan Expert! 🎉",
        message: "You know Nathan better than anyone! You're his soulmate!",
        emoji: "💕"
      };
    } else if (percentage >= 70) {
      return {
        title: "🌟 Great Friend! 🌟",
        message: "You know Nathan pretty well! You're a great friend!",
        emoji: "👏"
      };
    } else if (percentage >= 50) {
      return {
        title: "😊 Good Start! 😊",
        message: "You know some things about Nathan! Keep learning more!",
        emoji: "📚"
      };
    } else {
      return {
        title: "🤔 Getting to Know You! 🤔",
        message: "You're still learning about Nathan! That's okay!",
        emoji: "🤝"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (showResults) {
    const result = getResultMessage();
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="results-card">
            <h1 className="results-title">{result.title}</h1>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {quizQuestions.length}</span>
              </div>
              <div className="score-percentage">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>
            </div>
            <p className="results-message">{result.message}</p>
            <div className="result-emoji">{result.emoji}</div>
            
            <div className="results-buttons">
              <button onClick={resetQuiz} className="retry-btn">
                🔄 Try Again
              </button>
              <Link to="/" className="back-link">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>How Well Do You Know Nathan?</h1>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
          <p className="question-counter">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        <div className="question-card">
          <h2 className="question-text">{currentQ.question}</h2>
          
          <div className="options-grid">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={`option-btn ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              <div className="feedback-icon">
                {isCorrect ? '✅' : '❌'}
              </div>
              <div className="feedback-content">
                <p className="feedback-text">
                  {isCorrect ? 'Correct!' : `Wrong! The correct answer is: ${currentQ.options[currentQ.correct]}`}
                </p>
                <p className="fun-fact">{currentQ.funFact}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default QuizPage; 