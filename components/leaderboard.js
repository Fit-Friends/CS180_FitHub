import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LeaderboardPage({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState('steps');
  const [filter, setFilter] = useState('day');

  // Hard coded data for the leaderboard, add backend logic here to import user data:
  const leaderboardData = [
    { name: 'User1', stats: { steps: { day: 1000, week: 7000, month: 30000 }, pushups: { day: 50, week: 350, month: 1500 }, situps: { day: 30, week: 210, month: 900 }, squats: { day: 40, week: 280, month: 1200 }, lunges: { day: 20, week: 140, month: 600 } } },
    { name: 'User2', stats: { steps: { day: 800, week: 5600, month: 24000 }, pushups: { day: 40, week: 280, month: 1200 }, situps: { day: 20, week: 140, month: 600 }, squats: { day: 30, week: 210, month: 900 }, lunges: { day: 15, week: 105, month: 450 } } },
    { name: 'User3', stats: { steps: { day: 1200, week: 8400, month: 36000 }, pushups: { day: 60, week: 420, month: 1800 }, situps: { day: 40, week: 280, month: 1200 }, squats: { day: 50, week: 350, month: 1500 }, lunges: { day: 25, week: 175, month: 750 } } },
    { name: 'User4', stats: { steps: { day: 600, week: 4200, month: 18000 }, pushups: { day: 30, week: 210, month: 900 }, situps: { day: 25, week: 175, month: 750 }, squats: { day: 20, week: 140, month: 600 }, lunges: { day: 10, week: 70, month: 300 } } },
    { name: 'User5', stats: { steps: { day: 1500, week: 10500, month: 45000 }, pushups: { day: 70, week: 490, month: 2100 }, situps: { day: 50, week: 350, month: 1500 }, squats: { day: 60, week: 420, month: 1800 }, lunges: { day: 30, week: 210, month: 900 } } }
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.workoutOptions}>
          {Object.keys(leaderboardData[0].stats).map(workout => (
            <TouchableOpacity
              key={workout}
              style={[
                styles.optionButton,
                selectedWorkout === workout && styles.selectedOption
              ]}
              onPress={() => setSelectedWorkout(workout)}
            >
              <Text style={styles.optionText}>{workout.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterOptions}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'day' && styles.selectedFilterButton]}
          onPress={() => handleFilterChange('day')}
        >
          <Text style={styles.filterButtonText}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'week' && styles.selectedFilterButton]}
          onPress={() => handleFilterChange('week')}
        >
          <Text style={styles.filterButtonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'month' && styles.selectedFilterButton]}
          onPress={() => handleFilterChange('month')}
        >
          <Text style={styles.filterButtonText}>Month</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.leaderboard}>
        {leaderboardData.map((user, index) => (
          <View key={index}>
            <Text style={styles.leaderboardEntry}>{`${index + 1}. ${user.name}: ${user.stats[selectedWorkout][filter]}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#071525',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    color: 'white',
  },
  workoutOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
  },
  optionButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5
  },
  selectedOption: {
    backgroundColor: '#81A1C1',
    fontWeight: 'bold',
  },
  optionText: {
    color: 'white',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#5E81AC',
    borderRadius: 5
  },
  selectedFilterButton: {
    backgroundColor: '#8FBCBB',
    fontWeight: 'bold',
  },
  filterButtonText: {
    color: 'white',
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  leaderboard: {
    alignItems: 'left',
    backgroundColor: '#4C566A',
    borderRadius: 5,
  },
  leaderboardEntry: {
    marginVertical: 5,
    padding: 10,
    fontSize: 18,
    color: 'white',
    borderBottomColor: '#88C0D0',
    borderBottomWidth: 2,
  }
});