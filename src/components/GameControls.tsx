import React from 'react';
import Button from './Button'; 
import styles from '../styles/GameControls.module.css';

interface GameControlsProps {
  onReset: () => void;
  onSolve: () => void;
  onHint: () => void;
}

export const GameControls = ({ onReset, onSolve, onHint }: GameControlsProps) => {
  return (
    <div className={styles.gameControls}>
      <Button
        onClick={onReset}
        label="Reset"
        className={styles.controlButton}
      />
      <Button
        onClick={onSolve}
        label="Solve"
        className={styles.controlButton}
      />
      <Button
        onClick={onHint}
        label="Hint"
        className={styles.controlButton}
      />
    </div>
  );
};
