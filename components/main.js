import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios'; // Ensure axios is imported

export default function MainPage({ navigation, route }) {
    const [formData, setFormData] = useState({
        steps: '',
        pushups: '',
        situps: '',
        squats: '',
        lunges: '',
    });

    const [userEmail, setUserEmail] = useState('user@example.com'); // Use the logged-in user's email
    const {userId, email} = route.params || {};

    const exercises = [
        { key: 'steps', label: 'Steps' },
        { key: 'pushups', label: 'Push-Ups' },
        { key: 'situps', label: 'Sit-Ups' },
        { key: 'squats', label: 'Squats' },
        { key: 'lunges', label: 'Lunges' },
    ];

    const handleInputChange = (exerciseKey, value) => {
        setFormData({ ...formData, [exerciseKey]: value });
    };

    const handleSubmit = async () => {
      if (!userId) {
          Alert.alert('Error', 'User ID is required for submission and was not found.');
          return;
      }
  
      const postData = {
          user_id: userId,
          steps: formData.steps || '0',
          pushups: formData.pushups || '0',
          situps: formData.situps || '0',
          squarts: formData.squats || '0',
          lunges: formData.lunges || '0',
      };
  
      try {
          const response = await axios.post(`http://seannas.myqnapcloud.com:7010/log/`, postData);
  
          if (response.status === 200) {
              Alert.alert('Success', 'Log submitted successfully');
          } else {
              Alert.alert('Error', 'Failed to submit log');
          }
      } catch (error) {
          console.error('Error submitting log:', error);
          Alert.alert('Error', 'An error occurred during submission');
      }
  };
  
  

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style = {styles.label}>User Email: {email ? email : 'Not available'}</Text>
          <Text style = {styles.label}>User ID: {userId ? userId : 'Not available'}</Text>
            {exercises.map((exercise) => (
                <View key={exercise.key} style={styles.inputGroup}>
                    <Text style={styles.label}>{exercise.label}</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={formData[exercise.key]}
                        onChangeText={(text) => handleInputChange(exercise.key, text)}
                        placeholder="0"
                        placeholderTextColor="#6b7280"
                    />
                </View>
            ))}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 500, // Extra padding at the bottom
        backgroundColor: '#071525',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        flex: 1, // Take up as much space as possible
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    input: {
        width: 100, // Fixed width for the input
        borderWidth: 1,
        borderColor: '#071525',
        color: '#000000',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        fontSize: 15,
        fontWeight: 500,
        marginLeft: 10, // Space between label and input
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
