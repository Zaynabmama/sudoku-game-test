import React from 'react';
import { SudokuBoard } from './components/SudokuBoard';
import  ImageUploader  from './components/ImageUploader';
import styles from './styles/App.module.css';

export const App: React.ComponentType = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <h1>NavyBits Sudoku Challenge</h1>
      </header>
      <main className={styles.gameContainer}>
        <SudokuBoard />
        <ImageUploader />
      </main>
    </div>
  );
};