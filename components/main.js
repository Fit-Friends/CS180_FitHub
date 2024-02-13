import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';

const MainPage = () => {
  const [formData, setFormData] = useState({
    steps: '',
    pushUps: '',
    sitUps: '',
    squats: '',
    lunges: '',
  });

  const exercises = [
    { key: 'steps', label: 'Steps' },
    { key: 'pushUps', label: 'Push-Ups' },
    { key: 'sitUps', label: 'Sit-Ups' },
    { key: 'squats', label: 'Squats' },
    { key: 'lunges', label: 'Lunges' },
  ];

  const handleInputChange = (exerciseKey, value) => {
    setFormData({ ...formData, [exerciseKey]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    alert('Data submitted!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {exercises.map((exercise) => (
        <View key={exercise.key} style={styles.inputGroup}>
          <Text style={styles.label}>{exercise.label}</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={formData[exercise.key]}
            onChangeText={(text) => handleInputChange(exercise.key, text)}
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
    backgroundColor: '#071525'
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
    borderColor: '#cccccc',
    color:'#FFFFFF',
    borderRadius: 5,
    padding: 10,
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

export default MainPage;
