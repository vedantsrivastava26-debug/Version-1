import React from 'react'
import './QuestionCard.css'

const QuestionCard = ({ question, onAnswer }) => {
  if (!question) return null

  return (
    <div className="question-card-overlay">
      <div className="question-card">
        <div className="question-banner">{question.banner}</div>
        <div className="question-text">{question.question}</div>
        <div className="answer-buttons">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => onAnswer(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard

