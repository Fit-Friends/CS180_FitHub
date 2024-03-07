import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Ensure moment is installed

export default function LeaderboardPage() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [sortedLogs, setSortedLogs] = useState({});
    const [activeTimeframe, setActiveTimeframe] = useState('day');
    const [activeExercise, setActiveExercise] = useState('steps');

    useEffect(() => {
        const fetchLogsForAllUsers = async () => {
            try {
                const allLogs = [];
                for (let i = 1; i <= 3; i++) { // Adjust this for the number of users
                    const response = await axios.get(`http://seannas.myqnapcloud.com:7010/log/${i}`);
                    if (response.status === 200) {
                        allLogs.push(...response.data.map(log => ({ ...log, userId: i })));
                    } else {
                        setError('Failed to fetch logs');
                        return;
                    }
                }
                setLogs(allLogs);
            } catch (error) {
                console.error('Error fetching exercise logs:', error);
                setError('An error occurred while fetching exercise logs');
            }
        };

        fetchLogsForAllUsers();
    }, []);

    useEffect(() => {
      const processLogs = () => {
          // Get the start of the current timeframe
          const now = moment();
          const startOfTimeframe = now.startOf(activeTimeframe);
  
          // Create a new object to store the summed logs
          const tempSortedLogs = {};
  
          // Sum up exercises for each user within the active timeframe
          logs.forEach(log => {
              const logDate = moment(log.date);
              const userId = log.userId;
  
              // Check if the log date falls within the current timeframe
              if (logDate.isSameOrAfter(startOfTimeframe)) {
                  if (!tempSortedLogs[userId]) {
                      tempSortedLogs[userId] = { steps: 0, pushups: 0, situps: 0, squarts: 0, lunges: 0 };
                  }
  
                  // Sum the exercises
                  tempSortedLogs[userId].steps += log.steps;
                  tempSortedLogs[userId].pushups += log.pushups;
                  tempSortedLogs[userId].situps += log.situps;
                  tempSortedLogs[userId].squarts += log.squarts;
                  tempSortedLogs[userId].lunges += log.lunges;
              }
          });
  
          // Update the state with the summed logs
          setSortedLogs(tempSortedLogs);
      };
  
      if (logs.length) {
          processLogs();
      }
  }, [logs, activeTimeframe]); // Rerun when logs or activeTimeframe changes
  


    

    return (
      <ScrollView style={styles.container}>
          <Text style={styles.title}>Exercise Leaderboard</Text>
          <View style={styles.filterContainer}>
              <View style={styles.timeframeButtons}>
                  {['day', 'week', 'month', 'year'].map(frame => (
                      <TouchableOpacity
                          key={frame}
                          style={styles.buttonStyle(activeTimeframe, frame)}
                          onPress={() => setActiveTimeframe(frame)}
                      >
                          <Text style={styles.buttonText}>{frame.charAt(0).toUpperCase() + frame.slice(1)}</Text>
                      </TouchableOpacity>
                  ))}
              </View>
              <View style={styles.exerciseButtons}>
                  {['steps', 'pushups', 'situps', 'squarts', 'lunges'].map(exercise => (
                      <TouchableOpacity
                          key={exercise}
                          style={styles.buttonStyle(activeExercise, exercise)}
                          onPress={() => setActiveExercise(exercise)}
                      >
                          <Text style={styles.buttonText}>{exercise.charAt(0).toUpperCase() + exercise.slice(1)}</Text>
                      </TouchableOpacity>
                  ))}
              </View>
          </View>
          {error ? (
            <Text style={styles.error}>{error}</Text>
        ) : (
            Object.entries(sortedLogs).map(([userId, exercises]) => (
                <View key={userId} style={styles.userSection}>
                    <Text style={styles.userTitle}>User ID: {userId}</Text>
                    <View style={styles.recordEntry}>
                        <Text style={styles.recordText}>{activeExercise.charAt(0).toUpperCase() + activeExercise.slice(1)}: {exercises[activeExercise]}</Text>
                    </View>
                </View>
            ))
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#071525',
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    timeframeButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    exerciseButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonStyle: (active, type) => ([
        styles.button,
        active === type && styles.activeButton
    ]),
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#075eec',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    activeButton: {
        backgroundColor: '#81A1C1',
    },
    userSection: {
        marginBottom: 20,
        textAlign: 'center',
    },
    userTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF',
    },
    recordEntry: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    recordText: {
        fontSize: 16,
        lineHeight: 24,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
