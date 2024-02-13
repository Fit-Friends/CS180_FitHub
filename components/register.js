import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

// Accept the navigation prop for navigating between screens
export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    // Registration logic
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Registration successful!');
    // After registration, navigate to the login screen or the main part of your app
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6b7280"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#6b7280"
        value={formData.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#6b7280"
        value={formData.confirmPassword}
        onChangeText={text => handleInputChange('confirmPassword', text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister}>
        <View style={styles.register}>
          <Text style={styles.registerText}>Sign up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#071525',
  },
  input: {
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#cccccc',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  register: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
