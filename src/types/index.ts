export type SudokuGrid = number[][];
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface SudokuCellProps {
  value: number;
  row: number;
  col: number;
  isEditable: boolean;
  isConflict: boolean;
  onCellChange: (row: number, col: number, value: number) => void;
}

export interface SudokuGameState {
  grid: SudokuGrid;
  originalGrid: SudokuGrid;
  difficulty: Difficulty;
  isComplete: boolean;
  conflicts: { row: number; col: number }[];
}