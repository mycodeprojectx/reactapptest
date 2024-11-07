// src/components/QuestionCard.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (alternativeId: number) => void;
  answered: boolean;
}

export const QuestionCard = ({ question, onAnswer, answered }: QuestionCardProps) => {
  const { theme } = useApp();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const scaleAnim = new Animated.Value(1);

  const handleSelect = (alternativeId: number) => {
    if (!answered) {
      setSelectedId(alternativeId);
      onAnswer(alternativeId);
      
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const getAlternativeStyle = (alternativeId: number) => {
    if (!answered) return {};
    if (alternativeId === question.correctAlternativeId) {
      return styles.correctAnswer;
    }
    if (selectedId === alternativeId) {
      return styles.wrongAnswer;
    }
    return {};
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.statement, theme === 'dark' && styles.darkText]}>
        {question.statement}
      </Text>
      
      {question.alternatives.map((alternative) => (
        <Animated.View
          key={alternative.id}
          style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.alternative,
              getAlternativeStyle(alternative.id),
              theme === 'dark' && styles.darkAlternative,
            ]}
            onPress={() => handleSelect(alternative.id)}
            disabled={answered}>
            <Text style={[styles.alternativeText, theme === 'dark' && styles.darkText]}>
              {alternative.text}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {answered && (
        <View style={styles.explanation}>
          <Text style={[styles.explanationText, theme === 'dark' && styles.darkText]}>
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  statement: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  alternative: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 8,
  },
  darkAlternative: {
    backgroundColor: '#444',
  },
  alternativeText: {
    fontSize: 16,
    color: '#333',
  },
  correctAnswer: {
    backgroundColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: '#f44336',
  },
  explanation: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
  },
});