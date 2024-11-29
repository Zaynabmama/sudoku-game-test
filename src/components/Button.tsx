import React from 'react';
import styles from '../styles/Button.module.css';

interface ButtonProps {
  onClick: () => void;
  label: string;
  active?: boolean;
  className?: string;
}

const Button = ({ onClick, label, active, className }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ''} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
