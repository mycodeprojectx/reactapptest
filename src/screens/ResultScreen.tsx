// src/screens/ResultScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { PerformanceChart } from '../components/PerformanceChart';

export const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useApp();
  const { total, correct } = route.params;

  const shareResults = async () => {
    try {
      await Share.share({
        message: `Concluí o quiz com ${correct} acertos de ${total} questões!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const restartQuiz = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, theme === 'dark' && styles.darkText]}>
          Pontuação Final
        </Text>
        <Text style={[styles.score, theme === 'dark' && styles.darkText]}>
          {correct}/{total}
        </Text>
      </View>

      <PerformanceChart correct={correct} total={total} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={shareResults}>
          <Text style={styles.buttonText}>Compartilhar Resultado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.restartButton]}
          onPress={restartQuiz}>
          <Text style={styles.buttonText}>Novo Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  restartButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});