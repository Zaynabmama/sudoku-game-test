import { useState, useCallback } from 'react';
import { SudokuGenerator } from '../utils/sudokuGenerator';
import { SudokuValidator } from '../utils/sudokuValidator';
import { SudokuSolver } from '../utils/sudokuSolver';
import { SudokuGrid, Difficulty } from '../types';

export const useSudokuGame = () => {
  const [grid, setGrid] = useState<SudokuGrid>(
    SudokuGenerator.generatePuzzle('medium')
  );
  const [originalGrid, setOriginalGrid] = useState<SudokuGrid>(
    grid.map(row => [...row])
  );
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [solvedGrid, setSolvedGrid] = useState<SudokuGrid | null>(null);
  const [conflicts, setConflicts] = useState<{ row: number; col: number }[]>([]);

  const resetGame = useCallback(() => {
    const newPuzzle = SudokuGenerator.generatePuzzle(difficulty);
    setGrid(newPuzzle);
    setOriginalGrid(newPuzzle.map(row => [...row]));
    setConflicts([]);
    setSolvedGrid(null);
  }, [difficulty]);

  const updateCell = useCallback((row: number, col: number, value: number) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    
    setGrid(newGrid);
    setConflicts(SudokuValidator.findConflicts(newGrid));
  }, [grid]);

  const solvePuzzle = useCallback(() => {
    const solution = SudokuSolver.solve(grid);
    if (solution) {
      setSolvedGrid(solution);
      setGrid(solution);
    }
  }, [grid]);

  const getHint = useCallback(() => {
    if (!solvedGrid) {
      const solvedPuzzle = SudokuSolver.solve(grid);
      setSolvedGrid(solvedPuzzle);
      
      if (solvedPuzzle) {
        const hint = SudokuSolver.getHint(grid, solvedPuzzle);
        if (hint) {
          const newGrid = grid.map(r => [...r]);
          newGrid[hint.row][hint.col] = hint.value;
          setGrid(newGrid);
          setConflicts(SudokuValidator.findConflicts(newGrid));
        }
      }
    }
  }, [grid, solvedGrid]);

  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    const newPuzzle = SudokuGenerator.generatePuzzle(newDifficulty);
    setGrid(newPuzzle);
    setOriginalGrid(newPuzzle.map(row => [...row]));
    setConflicts([]);
    setSolvedGrid(null);
  }, []);

  return {
    grid,
    originalGrid,
    difficulty,
    conflicts,
    solvedGrid,
    updateCell,
    resetGame,
    solvePuzzle,
    getHint,
    changeDifficulty
  };
};