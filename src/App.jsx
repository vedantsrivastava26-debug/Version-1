import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import Maze from './components/Maze'
import QuestionCard from './components/QuestionCard'
import questionsData from './data/questions.json'

const GRID_SIZE = 10
const START_POS = { row: 0, col: 0 }
const EXIT_POS = { row: GRID_SIZE - 1, col: GRID_SIZE - 1 }

const App = () => {
  const [playerPosition, setPlayerPosition] = useState(START_POS)
  const [coins, setCoins] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [grid, setGrid] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isDimmed, setIsDimmed] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  // Initialize grid
  useEffect(() => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
    
    // Mark start and exit
    newGrid[START_POS.row][START_POS.col] = 0
    newGrid[EXIT_POS.row][EXIT_POS.col] = 0
    
    // Create a simple path with question cells
    const questionCells = [
      { row: 2, col: 2 },
      { row: 4, col: 4 },
      { row: 6, col: 6 },
      { row: 8, col: 8 },
    ]
    
    questionCells.forEach(cell => {
      if (cell.row < GRID_SIZE && cell.col < GRID_SIZE) {
        newGrid[cell.row][cell.col] = 1 // 1 = question cell
      }
    })
    
    // Create a path connecting start to exit through question cells
    const pathCells = []
    let currentRow = 0
    let currentCol = 0
    
    while (currentRow < GRID_SIZE - 1 || currentCol < GRID_SIZE - 1) {
      pathCells.push({ row: currentRow, col: currentCol })
      
      if (currentRow < GRID_SIZE - 1 && Math.random() > 0.4) {
        currentRow++
      } else if (currentCol < GRID_SIZE - 1) {
        currentCol++
      } else {
        currentRow++
      }
    }
    pathCells.push({ row: GRID_SIZE - 1, col: GRID_SIZE - 1 })
    
    setGrid(newGrid)
  }, [])

  // Timer
  useEffect(() => {
    if (gameWon) return
    
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameWon])

  // Check if player reached exit
  useEffect(() => {
    if (playerPosition.row === EXIT_POS.row && playerPosition.col === EXIT_POS.col) {
      setGameWon(true)
    }
  }, [playerPosition])

  // Check for question cells
  useEffect(() => {
    const cellValue = grid[playerPosition.row]?.[playerPosition.col]
    if (cellValue === 1 && questionIndex < questionsData.length && !currentQuestion && !gameWon) {
      setCurrentQuestion(questionsData[questionIndex])
      setIsDimmed(true)
    }
  }, [playerPosition, grid, questionIndex, currentQuestion, gameWon])

  const handleAnswer = useCallback((option) => {
    if (!currentQuestion) return

    const isCorrect = option.correct
    const direction = option.direction
    const newPosition = { ...playerPosition }

    if (isCorrect) {
      setCoins(prev => prev + 1)
    }

    // Move player based on the direction of the selected option
    switch (direction) {
      case 'up':
        if (newPosition.row > 0) newPosition.row--
        break
      case 'down':
        if (newPosition.row < GRID_SIZE - 1) newPosition.row++
        break
      case 'left':
        if (newPosition.col > 0) newPosition.col--
        break
      case 'right':
        if (newPosition.col < GRID_SIZE - 1) newPosition.col++
        break
      default:
        break
    }

    setPlayerPosition(newPosition)
    setCurrentQuestion(null)
    setIsDimmed(false)
    setQuestionIndex(prev => prev + 1)
  }, [currentQuestion, playerPosition])

  const calculateProgress = () => {
    const totalDistance = EXIT_POS.row + EXIT_POS.col
    const currentDistance = playerPosition.row + playerPosition.col
    const progress = Math.min(100, Math.round((currentDistance / totalDistance) * 100))
    return progress
  }

  const resetGame = () => {
    setPlayerPosition(START_POS)
    setCoins(0)
    setTimeElapsed(0)
    setCurrentQuestion(null)
    setQuestionIndex(0)
    setIsDimmed(false)
    setGameWon(false)
  }

  return (
    <div className={`app ${isDimmed ? 'dimmed' : ''}`}>
      <TopBar 
        coins={coins} 
        progress={calculateProgress()} 
        timeElapsed={timeElapsed}
      />
      
      <Maze 
        grid={grid}
        playerPosition={playerPosition}
        exitPosition={EXIT_POS}
      />

      {currentQuestion && (
        <QuestionCard 
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      )}

      {gameWon && (
        <div className="win-overlay">
          <div className="win-card">
            <h2>🎉 Level Complete! 🎉</h2>
            <p>Coins Earned: {coins}</p>
            <p>Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</p>
            <button className="reset-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

