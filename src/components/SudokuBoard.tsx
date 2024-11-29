import React, { useState } from 'react';
import { SudokuCell } from './SudokuCell';
import styles from '../styles/SudokuBoard.module.css';
import { useSudokuGame } from '../hooks/useSudokuGame';
import  DifficultySelector  from './DifficultySelector';
import { GameControls } from './GameControls';
import { SudokuSolver } from '../utils/sudokuSolver';

export const SudokuBoard: React.ComponentType = () => {
  const {
    grid,
    originalGrid,
    difficulty,
    conflicts,
    updateCell,
    resetGame,
    solvePuzzle,
    getHint: getHintFromSolver, 
    changeDifficulty
  } = useSudokuGame();

  const [hint, setHint] = useState<{ row: number; col: number; value: number } | null>(null);

  
  const getNextHint = () => {
    const solvedGrid = SudokuSolver.solve(grid); 
    if (solvedGrid) {
      const nextHint = SudokuSolver.getHint(grid, solvedGrid);
      setHint(nextHint); 
    }
  };

  return (
    <div className={styles.sudokuContainer}>
      <div className={styles.gameHeader}>
        <DifficultySelector 
          currentDifficulty={difficulty} 
          onDifficultyChange={changeDifficulty} 
        />
        <GameControls 
          onReset={resetGame}
          onSolve={solvePuzzle}
          onHint={getNextHint} 
        />
      </div>
      <div className={styles.sudokuBoard}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.sudokuRow}>
            {row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                row={rowIndex}
                col={colIndex}
                isEditable={originalGrid[rowIndex][colIndex] === 0}
                isConflict={conflicts.some(
                  c => c.row === rowIndex && c.col === colIndex
                )}
                onCellChange={updateCell}
              />
            ))}
          </div>
        ))}
      </div>
      
      {hint && (
        <div className={styles.hintMessage}>
          <p>Hint: Fill cell at row {hint.row + 1}, col {hint.col + 1} with value {hint.value}</p>
        </div>
      )}
    </div>
  );
};
