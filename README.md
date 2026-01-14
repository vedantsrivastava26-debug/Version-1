# Number Path - Math Maze Game

A mobile-first educational math game where players navigate through a maze by answering multiple-choice math questions.

## Overview

**Number Path** (also called **Math Maze**) is an interactive educational game where:
- Each move is controlled by answering MCQ math questions
- Each answer option corresponds to a direction/path in the maze
- Correct answers progress the player toward the exit
- Wrong answers lead to dead ends or longer routes
- Players can backtrack and correct mistakes

## Features

- 🎮 Grid-based maze system
- ❓ Question overlay system with card UI
- 🧭 Answer-to-direction mapping
- 🪙 Coin scoring system (1 correct answer = 1 coin)
- ⏱️ Timer and progress tracking
- 📱 Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
number-path-game/
├── src/
│   ├── components/
│   │   ├── TopBar.jsx          # Top bar with coins, progress, timer
│   │   ├── TopBar.css
│   │   ├── Maze.jsx            # Grid-based maze component
│   │   ├── Maze.css
│   │   ├── QuestionCard.jsx    # Question overlay card
│   │   └── QuestionCard.css
│   ├── data/
│   │   └── questions.json      # Question database
│   ├── App.jsx                 # Main game logic
│   ├── App.css
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Question Data Format

Questions are stored in `src/data/questions.json` with the following structure:

```json
{
  "id": 1,
  "banner": "Addition",
  "question": "What is 5 + 3?",
  "options": [
    { "text": "8", "correct": true, "direction": "up" },
    { "text": "7", "correct": false, "direction": "left" },
    { "text": "9", "correct": false, "direction": "right" },
    { "text": "6", "correct": false, "direction": "down" }
  ]
}
```

## Gameplay

1. Player starts at the maze entrance (top-left)
2. When reaching a question cell, a question card overlay appears
3. Player selects an answer from 3-4 options
4. Correct answers:
   - Award 1 coin
   - Move player closer to the exit
5. Wrong answers:
   - Move player to wrong paths or dead ends
   - Player must backtrack to continue
6. Reaching the exit completes the level

## Version 1 Scope

This is Version 1 focusing on:
- ✅ Core game logic
- ✅ Navigation system
- ✅ UI layout
- ✅ Question system
- ✅ Scoring

**Not included in V1:**
- Sound effects
- Advanced animations
- Visual polish/effects
- Multiple levels

## Technologies Used

- React 18
- Vite
- CSS3

## License

MIT

