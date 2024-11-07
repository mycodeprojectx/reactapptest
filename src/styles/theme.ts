// src/styles/theme.ts
export const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#4CAF50',
    secondary: '#2196F3',
    error: '#f44336',
    success: '#4CAF50',
    cardBackground: '#FFFFFF',
    borderColor: '#E0E0E0',
  };
  
  export const darkTheme = {
    background: '#1a1a1a',
    text: '#FFFFFF',
    primary: '#81C784',
    secondary: '#64B5F6',
    error: '#E57373',
    success: '#81C784',
    cardBackground: '#333333',
    borderColor: '#424242',
  };
  
  export type Theme = typeof lightTheme;