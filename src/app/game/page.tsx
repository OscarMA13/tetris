'use client';

import { useState, useEffect } from 'react';
import { getRandomShape, moveShapeLeft, moveShapeRight, moveShapeDown, placeShape, isShapeAtBottom, rotateShape } from '../utils/tetrisUtils';

export default function Play() {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(Array(200).fill(null));
  const [isRunning, setIsRunning] = useState(false);
  const [currentShape, setCurrentShape] = useState<number[][]>([]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (isRunning) {
      setCurrentShape(getRandomShape());
      setPosition(0);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const gameInterval = setInterval(() => {
        setPosition((prevPosition) => {
          const newPosition = moveShapeDown(prevPosition, board, currentShape);
          if (isShapeAtBottom(newPosition, board, currentShape)) {
            setBoard((prevBoard) => placeShape([...prevBoard], prevPosition, currentShape)); // Place at previous position
            setCurrentShape(getRandomShape()); // Get a new shape
            return 0; // Reset position for the new shape
          }
          return newPosition;
        });
      }, 1000);
      return () => clearInterval(gameInterval);
    }
  }, [isRunning, board, currentShape]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setPosition((prevPosition) => moveShapeLeft(prevPosition));
      }
      if (event.key === 'ArrowRight') {
        setPosition((prevPosition) => moveShapeRight(prevPosition, currentShape[0].length));
      }
      if (event.key === 'ArrowDown') {
        setPosition((prevPosition) => moveShapeDown(prevPosition, board, currentShape));
      }
      if(event.key === 'ArrowUp') {
        setCurrentShape((prevShape) => rotateShape(prevShape));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, currentShape]);

  const startGame = () => {
    setIsRunning(true);
    setBoard(Array(200).fill(null));
    setScore(0);
  };

  const renderBoard = () => {
    const newBoard = placeShape([...board], position, currentShape);
    return newBoard;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex-grow grid grid-rows-[20px,200px] gap-4">
        <div className="flex justify-between">
          <p>Score: {score}</p>
          <button className="bg-blue-200 text-black w-20 h-6 rounded" onClick={startGame}>
            Start
          </button>
        </div>
        <div className="grid grid-cols-10 gap-1">
          {renderBoard().map((cell, index) => (
            <div key={index} className={`w-6 h-6 border border-gray-300 ${cell === 'shape' ? 'bg-blue-500' : ''}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
