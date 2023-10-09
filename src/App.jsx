// App.js

import { useState, useEffect } from 'react';
import './index.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!winner) {
      const winnerCheck = calculateWinner(board);
      if (winnerCheck) {
        setWinner(winnerCheck);
      } else if (!board.includes(null)) {
        // If no winner and the board is filled, it's a draw
        setWinner('Draw');
      } else if (!isXNext) {
        // If it's computer's turn
        const computerMove = calculateComputerMove(board);
        handleSquareClick(computerMove);
      }
    }
  }, [board, isXNext, winner]);

  const handleSquareClick = (index) => {
    if (board[index] || winner) {
      // If the square is already filled or there's a winner, do nothing
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleSquareClick(index)}>
      {board[index]}
    </button>
  );

  const restartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="app">
      <div className="status">{getStatus()}</div>
      <div className="board">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: 3 }, (_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

// Function to calculate the winner of the game
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

// Function to calculate the computer's move (random move for simplicity)
const calculateComputerMove = (squares) => {
  const emptySquares = squares.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

export default App;
