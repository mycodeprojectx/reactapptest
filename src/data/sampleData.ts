// src/data/sampleData.ts
export const sampleThemes = [
    {
      id: 1,
      name: 'Matemática Básica',
      description: 'Conceitos fundamentais de matemática',
      totalQuestions: 3,
    },
    {
      id: 2,
      name: 'História Geral',
      description: 'Principais eventos históricos',
      totalQuestions: 3,
    },
  ];
  
  export const sampleQuestions = [
    {
      id: 1,
      theme: '1',
      statement: 'Qual é o resultado de 15 + 27?',
      alternatives: [
        { id: 1, text: '32' },
        { id: 2, text: '42' },
        { id: 3, text: '52' },
        { id: 4, text: '37' },
        { id: 5, text: '47' },
      ],
      explanation: 'A soma de 15 + 27 = 42. Para resolver, podemos decompor os números: 15 = 10 + 5 e 27 = 20 + 7, então (10 + 20) + (5 + 7) = 30 + 12 = 42',
      correctAlternativeId: 2,
    },
    // Adicione mais questões aqui
  ];