// src/types/index.ts
export interface Theme {
    id: number;
    name: string;
    description: string;
    totalQuestions: number;
  }
  
  export interface Alternative {
    id: number;
    text: string;
  }
  
  export interface Question {
    id: number;
    theme: string;
    statement: string;
    alternatives: Alternative[];
    explanation: string;
    correctAlternativeId: number;
  }
  
  export interface Progress {
    date: string;
    score: number;
  }