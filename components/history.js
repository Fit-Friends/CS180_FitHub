import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import moment from 'moment'; 
import UserContext from './UserContext';

export default function HistoryPage() {
    const { user } = useContext(UserContext); // Using user from context
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogsForCurrentUser = async () => {
            if (!user.userId) return; // Makes sure there is a user ID available

            try {
                const response = await axios.get(`http://seannas.myqnapcloud.com:7010/log/${user.userId}`);
                if (response.status === 200) {
                    setLogs(response.data);
                } else {
                    setError('Failed to fetch logs');
                }
            } catch (error) {
                console.error('Error fetching exercise logs:', error);
                setError('An error occurred while fetching exercise logs');
            }
        };

        fetchLogsForCurrentUser();
    }, [user.userId]);

    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exercise History</Text>
            <Text style={styles.heading}>Welcome to your Exercise History! Below are all of the workout logs you've submitted through the app.</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                logs.length > 0 ? (
                    logs.map((log, index) => (
                        <View key={index} style={styles.logEntry}>
                            <Text style={styles.logDate}>Date & Time of Log: {moment(log.date).format('YYYY-MM-DD HH:mm')}</Text>
                            <Text style={styles.logText}>Steps: {log.steps}</Text>
                            <Text style={styles.logText}>Pushups: {log.pushups}</Text>
                            <Text style={styles.logText}>Situps: {log.situps}</Text>
                            <Text style={styles.logText}>Squats: {log.squarts}</Text>
                            <Text style={styles.logText}>Lunges: {log.lunges}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No logs found.</Text>
                )
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#071525',
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center',
    },
    heading: {
        fontSize: 21,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center', 
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    logEntry: {
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    logDate: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logText: {
        fontSize: 18,
    },
});
