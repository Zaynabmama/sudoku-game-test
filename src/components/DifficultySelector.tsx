import React from 'react';
import { Difficulty } from '../types';
import Button from './Button';
import styles from '../styles/DifficultySelector.module.css';

interface DifficultySelectProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }: DifficultySelectProps) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className={styles.difficultySelector}>
      {difficulties.map(diff => (
        <Button
          key={diff}
          onClick={() => onDifficultyChange(diff)}
          label={diff.charAt(0).toUpperCase() + diff.slice(1)}
          active={currentDifficulty === diff}
          className={styles.difficultyButton}
        />
      ))}
    </div>
  );
};

export default DifficultySelector;
