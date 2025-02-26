'use client';


export const shapes = [
    [[1, 1, 1, 1]], // I shape
    [[1, 1, 1], [0, 1, 0]], // T shape
    [[1, 1, 0], [0, 1, 1]], // Z shape
    [[0, 1, 1], [1, 1, 0]], // S shape
    [[1, 1], [1, 1]], // O shape
    [[1, 0, 0], [1, 1, 1]], // L shape
    [[0, 0, 1], [1, 1, 1]], // J shape
  ];

  export const getRandomShape = (): number[][] => {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
  };

  export const moveShapeLeft = (position: number): number => {
    if (position % 10 === 0) return position;
    return position - 1;
  };

  export const moveShapeRight = (position: number, shapeSize: number): number => {
    if ((position % 10) + shapeSize >= 10) return position;
    return position + 1;
  };

  export const moveShapeDown = (position: number, board: (string | null)[], currentShape: number[][]): number => {
    const newPosition = position + 10;
    const isAtBottom = currentShape.some((row, rowIndex) =>
      row.some((cell, colIndex) => {
        if (cell === 1) {
          const absolutePosition = newPosition + rowIndex * 10 + colIndex;
          return absolutePosition >= 200 || board[absolutePosition] !== null;
        }
        return false;
      })
    );

    return isAtBottom ? position : newPosition;
  };

  export const placeShape = (board: (string | null)[], position: number, currentShape: number[][]): (string | null)[] => {
    const newBoard = [...board];
    currentShape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          const absolutePosition = position + rowIndex * 10 + colIndex;
          newBoard[absolutePosition] = 'shape';
        }
      });
    });
    return newBoard;
  };
