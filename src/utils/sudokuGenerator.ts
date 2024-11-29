import { SudokuValidator } from './sudokuValidator';
import { Difficulty } from '../types';

export class SudokuGenerator {
  private static shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static generateSolvedGrid(): number[][] {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    this.solve(grid);
    return grid;
  }

  private static solve(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of numbers) {
            if (SudokuValidator.isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              if (this.solve(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  static generatePuzzle(difficulty: Difficulty): number[][] {
    const solvedGrid = this.generateSolvedGrid();
    const puzzle = solvedGrid.map(row => [...row]);

    const cellsToRemove = this.getCellsToRemoveByDifficulty(difficulty);
    let removedCells = 0;

    while (removedCells < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (puzzle[row][col] !== 0) {
        const original = puzzle[row][col];
        puzzle[row][col] = 0;
        removedCells++;

        const tempPuzzle = puzzle.map(r => [...r]);
        if (!this.hasUniqueSolution(tempPuzzle)) {
          puzzle[row][col] = original;
          removedCells--;
        }
      }
    }

    return puzzle;
  }

  private static hasUniqueSolution(grid: number[][]): boolean {
    const solutions: number[][][] = [];
    this.findAllSolutions(grid, solutions);
    return solutions.length === 1;
  }

  private static findAllSolutions(grid: number[][], solutions: number[][][], maxSolutions = 2): boolean {
    if (solutions.length >= maxSolutions) return true;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (SudokuValidator.isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              
              if (this.findAllSolutions(grid, solutions, maxSolutions)) {
                if (SudokuValidator.isBoardComplete(grid)) {
                  solutions.push(grid.map(r => [...r]));
                }
              }
              
              grid[row][col] = 0;
            }
          }
          return solutions.length < maxSolutions;
        }
      }
    }
    return true;
  }

  private static getCellsToRemoveByDifficulty(difficulty: Difficulty): number {
    switch (difficulty) {
      case 'easy': return 30;
      case 'medium': return 45;
      case 'hard': return 55;
      default: return 40;
    }
  }
}