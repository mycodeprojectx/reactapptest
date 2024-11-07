// src/components/ThemeCard.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Theme } from '../types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ThemeCardProps {
  theme: Theme;
  selected: boolean;
  onSelect: () => void;
}

export const ThemeCard = ({ theme, selected, onSelect }: ThemeCardProps) => {
  const { theme: appTheme } = useApp();
  const scaleAnim = new Animated.Value(1);

  const handlePress = () => {
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

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    onSelect();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.container,
          selected && styles.selected,
          appTheme === 'dark' && styles.darkContainer,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}>
        <View style={styles.content}>
          <Text style={[styles.title, appTheme === 'dark' && styles.darkText]}>
            {theme.name}
          </Text>
          <Text style={[styles.description, appTheme === 'dark' && styles.darkText]}>
            {theme.description}
          </Text>
          <View style={styles.footer}>
            <Text style={[styles.count, appTheme === 'dark' && styles.darkCount]}>
              {theme.totalQuestions} questões
            </Text>
            {selected && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>Selecionado</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  selected: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  darkText: {
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  darkCount: {
    color: '#81C784',
  },
  selectedIndicator: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  selectedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});