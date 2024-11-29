export class SudokuValidator {
    static isValidMove(grid: number[][], row: number, col: number, value: number): boolean {
      
      for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === value) return false;
      }
  
      for (let y = 0; y < 9; y++) {
        if (y !== row && grid[y][col] === value) return false;
      }
  
      const boxRowStart = Math.floor(row / 3) * 3;
      const boxColStart = Math.floor(col / 3) * 3;
  
      for (let i = boxRowStart; i < boxRowStart + 3; i++) {
        for (let j = boxColStart; j < boxColStart + 3; j++) {
          if (i !== row && j !== col && grid[i][j] === value) return false;
        }
      }
  
      return true;
    }
  
    static findConflicts(grid: number[][]): { row: number; col: number }[] {
      const conflicts: { row: number; col: number }[] = [];
  
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] !== 0 && !this.isValidMove(grid, row, col, grid[row][col])) {
            conflicts.push({ row, col });
          }
        }
      }
  
      return conflicts;
    }
  
    static isBoardComplete(grid: number[][]): boolean {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) return false;
        }
      }
      return this.findConflicts(grid).length === 0;
    }
  }