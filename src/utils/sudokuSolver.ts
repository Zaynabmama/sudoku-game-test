import { SudokuValidator } from './sudokuValidator';

export class SudokuSolver {
  static solve(grid: number[][]): number[][] | null {
    const solution = grid.map(row => [...row]);
    
    if (this.solveSudoku(solution)) {
      return solution;
    }
    
    return null;
  }

  private static solveSudoku(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (SudokuValidator.isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              
              if (this.solveSudoku(grid)) {
                return true;
              }
              
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  private static lastHint: { row: number; col: number } | null = null;

  static getHint(grid: number[][], solvedGrid: number[][]): { row: number; col: number; value: number } | null {
    let startRow = 0;
    let startCol = 0;

    if (this.lastHint) {
      startRow = this.lastHint.row;
      startCol = this.lastHint.col;
    }

    for (let row = startRow; row < 9; row++) {
      for (let col = (row === startRow ? startCol : 0); col < 9; col++) {
        if (grid[row][col] === 0) {
          this.lastHint = { row, col };
          
          return { row, col, value: solvedGrid[row][col] };
        }
      }
    }

    return null; 
  }
}