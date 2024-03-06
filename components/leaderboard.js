import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Ensure moment is installed

export default function LeaderboardPage() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [sortedLogs, setSortedLogs] = useState({});

    useEffect(() => {
        const fetchLogsForAllUsers = async () => {
            try {
                const allLogs = [];
                for (let i = 1; i <= 3; i++) { // Assuming there are 3 users
                    const response = await axios.get(`http://seannas.myqnapcloud.com:7010/log/${i}`);
                    if (response.status === 200) {
                        allLogs.push(...response.data.map(log => ({ ...log, userId: i }))); // Add userId to each log
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
        // Process logs to sum up exercises for each timeframe
        const processLogs = () => {
            const tempSortedLogs = {}; // Format: { [userId]: { [timeframe]: { steps: 0, pushups: 0, ... } } }

            logs.forEach(log => {
                const userId = log.userId;
                ['day', 'week', 'month', 'year'].forEach(timeframe => {
                    const key = moment(log.date).startOf(timeframe).format();
                    tempSortedLogs[userId] = tempSortedLogs[userId] || {};
                    tempSortedLogs[userId][timeframe] = tempSortedLogs[userId][timeframe] || {};
                    tempSortedLogs[userId][timeframe][key] = tempSortedLogs[userId][timeframe][key] || { steps: 0, pushups: 0, situps: 0, squarts: 0, lunges: 0 };

                    // Sum up exercises
                    tempSortedLogs[userId][timeframe][key].steps += log.steps;
                    tempSortedLogs[userId][timeframe][key].pushups += log.pushups;
                    tempSortedLogs[userId][timeframe][key].situps += log.situps;
                    tempSortedLogs[userId][timeframe][key].squarts += log.squarts;
                    tempSortedLogs[userId][timeframe][key].lunges += log.lunges;
                });
            });

            setSortedLogs(tempSortedLogs);
        };

        if (logs.length) {
            processLogs();
        }
    }, [logs]);

    // Rendering logic, including error handling and data display
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exercise Leaderboard</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                Object.entries(sortedLogs).map(([userId, timeframes]) =>
                    <View key={userId} style={styles.userSection}>
                        <Text style={styles.userTitle}>User ID: {userId}</Text>
                        {Object.entries(timeframes).map(([timeframe, records]) =>
                            <View key={timeframe} style={styles.timeframeSection}>
                                <Text style={styles.timeframeTitle}>{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</Text>
                                {Object.entries(records).map(([date, record]) =>
                                    <View key={date} style={styles.recordEntry}>
                                        <Text style={styles.recordDate}>{moment(date).format('YYYY-MM-DD')}</Text>
                                        <Text style={styles.recordText}>Steps: {record.steps}</Text>
                                        <Text style={styles.recordText}>Pushups: {record.pushups}</Text>
                                        <Text style={styles.recordText}>Situps: {record.situps}</Text>
                                        <Text style={styles.recordText}>Squats: {record.squarts}</Text>
                                        <Text style={styles.recordText}>Lunges: {record.lunges}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                )
            )}
        </ScrollView>
    );
}

// You can use or modify your existing styles
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
    userSection: {
        marginBottom: 20,
    },
    userTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    timeframeSection: {
        marginBottom: 15,
    },
    timeframeTitle: {
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    recordEntry: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    recordDate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    recordText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
