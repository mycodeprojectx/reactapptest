// src/context/AppContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface AppContextData {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentQuestion: number;
  setCurrentQuestion: (question: number) => void;
  score: number;
  setScore: (score: number) => void;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentQuestion,
        setCurrentQuestion,
        score,
        setScore,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);