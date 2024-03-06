import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import UserContext from './UserContext';

export default function LeaderboardPage() {
    const { user } = useContext(UserContext);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get('http://seannas.myqnapcloud.com:7010/leaderboard');
                if (response.status === 200) {
                    setLeaderboardData(response.data);
                } else {
                    setError('Failed to fetch leaderboard data');
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
                setError('An error occurred while fetching leaderboard data');
            }
        };

        fetchLeaderboardData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exercise Leaderboard</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View style={styles.leaderboard}>
                    {leaderboardData.map((userStats, index) => (
                        <View key={index} style={styles.leaderboardEntry}>
                            <Text style={styles.userId}>User ID: {index}</Text>
                            <Text>Steps: {userStats.steps}</Text>
                            <Text>Pushups: {userStats.pushups}</Text>
                            <Text>Situps: {userStats.situps}</Text>
                            <Text>Squats: {userStats.squats}</Text>
                            <Text>Lunges: {userStats.lunges}</Text>
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
    leaderboard: {
        marginTop: 10,
    },
    leaderboardEntry: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    userId: {
        fontWeight: 'bold',
    },
});
