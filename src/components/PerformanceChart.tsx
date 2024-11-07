// src/components/PerformanceChart.tsx
import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useApp } from '../context/AppContext';

interface PerformanceChartProps {
  correct: number;
  total: number;
}

export const PerformanceChart = ({ correct, total }: PerformanceChartProps) => {
  const { theme } = useApp();
  const percentage = (correct / total) * 100;

  const data = {
    labels: ['Desempenho'],
    datasets: [
      {
        data: [percentage],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
          backgroundGradientFrom: theme === 'dark' ? '#1a1a1a' : '#fff',
          backgroundGradientTo: theme === 'dark' ? '#1a1a1a' : '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};