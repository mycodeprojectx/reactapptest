// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { realm } from '../database/schema';
import { ThemeCard } from '../components/ThemeCard';
import { Theme } from '../types';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useApp();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const buttonScale = new Animated.Value(1);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = () => {
    const savedThemes = realm.objects('Theme');
    setThemes(Array.from(savedThemes));
  };

  const handleThemeSelect = (themeId: number) => {
    setSelectedTheme(themeId);
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startQuiz = () => {
    if (selectedTheme) {
      navigation.navigate('Quiz', { themeId: selectedTheme });
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <FlatList
        data={themes}
        renderItem={({ item }) => (
          <ThemeCard
            theme={item}
            selected={selectedTheme === item.id}
            onSelect={() => handleThemeSelect(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedTheme && styles.disabledButton,
            theme === 'dark' && styles.darkButton,
          ]}
          onPress={startQuiz}
          disabled={!selectedTheme}>
          <Text style={styles.startButtonText}>Iniciar Estudo</Text>
        </TouchableOpacity>
      </Animated.View>
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
  listContainer: {
    paddingBottom: 16,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  darkButton: {
    backgroundColor: '#2e7d32',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});