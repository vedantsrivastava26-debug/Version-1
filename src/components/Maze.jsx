import React from 'react'
import './Maze.css'

const Maze = ({ grid, playerPosition, exitPosition }) => {
  const GRID_SIZE = 10
  const CELL_SIZE = Math.min(window.innerWidth / GRID_SIZE, 50)

  const getCellType = (row, col) => {
    if (row === playerPosition.row && col === playerPosition.col) {
      return 'player'
    }
    if (row === exitPosition.row && col === exitPosition.col) {
      return 'exit'
    }
    if (row === 0 && col === 0) {
      return 'start'
    }
    const cell = grid[row] && grid[row][col]
    if (cell === undefined) {
      return 'wall'
    }
    if (cell === 0) {
      return 'path'
    }
    if (cell === 1) {
      return 'question'
    }
    return 'wall'
  }

  return (
    <div className="maze-container">
      <div 
        className="maze-grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const row = Math.floor(index / GRID_SIZE)
          const col = index % GRID_SIZE
          const cellType = getCellType(row, col)
          
          return (
            <div
              key={index}
              className={`maze-cell ${cellType}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              {cellType === 'player' && <div className="player-avatar">👤</div>}
              {cellType === 'exit' && <div className="exit-marker">🏁</div>}
              {cellType === 'start' && <div className="start-marker">▶</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Maze

