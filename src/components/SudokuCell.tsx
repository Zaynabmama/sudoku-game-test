import React from 'react';
import styles from '../styles/SudokuCell.module.css';
import { SudokuCellProps } from '../types';

export const SudokuCell: React.ComponentType<SudokuCellProps> = ({ 
  value, 
  row, 
  col, 
  isEditable, 
  isConflict, 
  onCellChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
    
    if (numValue >= 0 && numValue <= 9) {
      onCellChange(row, col, numValue);
    }
  };

  return (
    <input
      type="number"
      min="0"
      max="9"
      className={`
        ${styles.sudokuCell} 
        ${isEditable ? styles.editable : styles.locked}
        ${isConflict ? styles.conflict : ''}
      `}
      value={value || ''}
      onChange={handleChange}
      disabled={!isEditable}
    />
  );
};