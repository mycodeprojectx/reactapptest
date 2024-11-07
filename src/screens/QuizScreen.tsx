// src/screens/QuizScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { realm } from '../database/schema';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { Question } from '../types';

export const QuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme, setScore } = useApp();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const { themeId } = route.params;
    const themeQuestions = realm
      .objects('Question')
      .filtered('theme == $0', themeId);
    setQuestions(Array.from(themeQuestions).sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (alternativeId: number) => {
    if (!answered) {
      const isCorrect = alternativeId === questions[currentIndex].correctAlternativeId;
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
      setAnswered(true);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
    } else {
      setScore(correctAnswers);
      navigation.navigate('Result', {
        total: questions.length,
        correct: correctAnswers,
      });
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
      />
      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        {questions[currentIndex] && (
          <QuestionCard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            answered={answered}
          />
        )}
      </Animated.View>
      {answered && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentIndex < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
  questionContainer: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});