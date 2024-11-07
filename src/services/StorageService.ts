// src/services/StorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { realm } from '../database/schema';

export class StorageService {
  static async saveProgress(themeId: number, score: number) {
    try {
      const key = `progress_${themeId}`;
      const existingProgress = await AsyncStorage.getItem(key);
      const progress = existingProgress ? JSON.parse(existingProgress) : [];
      
      progress.push({
        date: new Date().toISOString(),
        score,
      });

      await AsyncStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  static async getProgress(themeId: number) {
    try {
      const key = `progress_${themeId}`;
      const progress = await AsyncStorage.getItem(key);
      return progress ? JSON.parse(progress) : [];
    } catch (error) {
      console.error('Error getting progress:', error);
      return [];
    }
  }

  static async clearProgress(themeId: number) {
    try {
      const key = `progress_${themeId}`;
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  }
}