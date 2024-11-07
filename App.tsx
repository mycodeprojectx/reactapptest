// App.tsx
import React, { useEffect } from 'react';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { realm } from './src/database/schema';
import { sampleThemes, sampleQuestions } from './src/data/sampleData';

const App = () => {
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    realm.write(() => {
      sampleThemes.forEach(theme => {
        realm.create('Theme', theme, 'modified');
      });
      sampleQuestions.forEach(question => {
        realm.create('Question', question, 'modified');
      });
    });
  };

  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;