import React, { useState } from 'react';
import { OcrImageProcessor } from '../utils/imageProcessor'; 
import { SudokuSolver } from '../utils/sudokuSolver';

const SudokuSolverApp: React.FunctionComponent = () => {
  const [image, setImage] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [board, setBoard] = useState<number[][] | null>(null);
  const [solvedBoard, setSolvedBoard] = useState<number[][] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); 
      setErrorMessage(null);
      extractAndSolve(file);
    }
  };

  const extractAndSolve = async (file: File) => {
    try {
      const ocrOutput = await OcrImageProcessor.extractTextFromImage(file); 
      if (ocrOutput) {
        setOcrText(ocrOutput); 

        const parsedBoard = OcrImageProcessor.parseOCRText(ocrOutput);
        if (parsedBoard) {
          setBoard(parsedBoard); 
          const solved = OcrImageProcessor.getSolution(parsedBoard); 
          setSolvedBoard(solved || null); 
        } else {
          setErrorMessage('Unable to extract valid Sudoku board from the image.');
        }
      } else {
        setErrorMessage('OCR failed to extract text from the image.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing the image.');
    }
  };

  return (
    <div>
      <h1>Sudoku Solver</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div>
        <h2>OCR Output:</h2>
        <pre>{ocrText}</pre>
      </div>

      <div>
        <h2>Sudoku Board:</h2>
        {board && <pre>{JSON.stringify(board, null, 2)}</pre>}
      </div>

      <div>
        <h2>Solved Board:</h2>
        {solvedBoard ? (
          <pre>{JSON.stringify(solvedBoard, null, 2)}</pre>
        ) : (
          <p>No solution found or board is invalid.</p>
        )}
      </div>
    </div>
  );
};

export default SudokuSolverApp;
