// src/components/ProgressBar.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const { theme } = useApp();
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, theme === 'dark' && styles.darkProgressContainer]}>
        <View 
          style={[
            styles.progressBar,
            { width: `${progress}%` },
            theme === 'dark' && styles.darkProgressBar
          ]} 
        />
      </View>
      <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
        {current} de {total} questões
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  darkProgressContainer: {
    backgroundColor: '#424242',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  darkProgressBar: {
    backgroundColor: '#81C784',
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  darkText: {
    color: '#E0E0E0',
  },
});