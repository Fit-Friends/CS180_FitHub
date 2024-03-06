import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import UserContext from './UserContext';

export default function LeaderboardPage() {
    const { user } = useContext(UserContext);
    const [logs, setLogs] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchLogsForAllUsers = async () => {
          try {
              const allLogs = [];
              // Iterate over user IDs starting from 1
              for (let i = 1; i <= 3; i++) { // Assuming there are 3 users
                  const response = await axios.get(`http://seannas.myqnapcloud.com:7010/log/${i}`);
                  if (response.status === 200) {
                      // Concatenate logs for each user
                      allLogs.push(...response.data);
                  } else {
                      setError('Failed to fetch logs');
                      return; // Exit the loop if an error occurs
                  }
              }
              // Set logs for all users
              setLogs(allLogs);
          } catch (error) {
              console.error('Error fetching exercise logs:', error);
              setError('An error occurred while fetching exercise logs');
          }
      };
  
      fetchLogsForAllUsers();
  }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exercise Leaderboard</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View style={styles.logsContainer}>
                    {logs && logs.map((log, index) => (
                        <View key={index} style={styles.logEntry}>
                            <Text style={styles.logText}>Date: {log.date}</Text>
                            <Text style={styles.logText}>Steps: {log.steps}</Text>
                            <Text style={styles.logText}>Pushups: {log.pushups}</Text>
                            <Text style={styles.logText}>Situps: {log.situps}</Text>
                            <Text style={styles.logText}>Squats: {log.squarts}</Text>
                            <Text style={styles.logText}>Lunges: {log.lunges}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    logsContainer: {
        marginBottom: 20,
    },
    logEntry: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    logText: {
        fontSize: 16,
        lineHeight: 24,
    },
});