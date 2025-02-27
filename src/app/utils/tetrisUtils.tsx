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
  let newPosition = position + 10;

  const isBlocked = currentShape.some((row, rowIndex) =>
    row.some((cell, colIndex) => {
      if (cell === 1) {
        const absolutePosition = newPosition + rowIndex * 10 + colIndex;
        return absolutePosition >= 200 || board[absolutePosition] !== null;
      }
      return false;
    })
  );

  return isBlocked ? position : newPosition;
};


export const isShapeAtBottom = (position: number, board: (string | null)[], currentShape: number[][]): boolean => {
  return currentShape.some((row, rowIndex) =>
    row.some((cell, colIndex) => {
      if (cell === 1) {
        const absolutePosition = position + rowIndex * 10 + colIndex;
        return absolutePosition + 10 >= 200 || board[absolutePosition + 10] !== null;
      }
      return false;
    })
  );
};



export const rotateShape = (shape: number[][], position: number, board: (string | null)[]): number[][] => {
  const rows = shape.length;
  const cols = shape[0].length;
  const newShape = Array.from({ length: cols }, () => Array(rows).fill(0));

  // Apply 90-degree rotation
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      newShape[col][rows - 1 - row] = shape[row][col]; // Rotating by 90 degrees
    }
  }

  const isValid = newShape.every((row, rowIndex) =>
    row.every((cell, colIndex) => {
      if (cell === 1) {
        const absolutePosition = position + rowIndex * 10 + colIndex;
        return absolutePosition < 200 && board[absolutePosition] === null;
      }
      return true;
    })
  );

  return isValid ? newShape : shape;
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
