import Tesseract from 'tesseract.js';
import { SudokuSolver } from './sudokuSolver';

export class OcrImageProcessor {
  // Extracts text from the provided image using Tesseract.js
  static async extractTextFromImage(image: File): Promise<string | null> {
    try {
      const { data: { text } } = await Tesseract.recognize(image, 'eng', {
        logger: (m) => console.log(m), // Optional logger to track OCR progress
      });
      return text.trim(); // Return the OCR text
    } catch (error) {
      console.error('Error during OCR processing:', error);
      return null; // Return null if OCR fails
    }
  }

  // Converts the raw OCR text into a valid 9x9 Sudoku board
  static parseOCRText(ocrText: string): number[][] | null {
    const lines = ocrText.split('\n').map(line => line.trim());

    // Ensure there are exactly 9 lines
    if (lines.length !== 9) return null;

    const board: number[][] = [];

    for (let row = 0; row < 9; row++) {
      const rowData = lines[row].replace(/\D/g, ''); // Remove non-digit characters
      if (rowData.length !== 9) return null; // Ensure the row has 9 digits

      const parsedRow = rowData.split('').map(char => parseInt(char, 10));
      board.push(parsedRow);
    }

    return board; // Return the parsed 9x9 board
  }

  // Solves the Sudoku board using backtracking (this uses the SudokuSolver you already have)
  static solveSudoku(grid: number[][]): number[][] | null {
    return SudokuSolver.solve(grid);
  }

  // Returns the solved Sudoku board or null if unsolvable
  static getSolution(grid: number[][]): number[][] | null {
    const solvedGrid = grid.map(row => [...row]);
    return this.solveSudoku(solvedGrid); // Solve the grid and return the solution
  }
}
