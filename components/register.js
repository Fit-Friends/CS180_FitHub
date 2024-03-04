import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    if (formData.password1 !== formData.password2) {
      alert('Passwords do not match.');
      return;
    }

    setIsLoading(true); 

    try {
      const response = await axios({
        method: 'post',
        url: 'http://seannas.myqnapcloud.com:7010/register/', 
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: formData.email,
          password1: formData.password1,
          password2: formData.password2,
        },
      });
        console.log(response.status);
      if (response.status === 204) {
        alert('Registration successful!');
        navigation.navigate('Login'); 
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false); 
    }
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
        value={formData.password1}
        onChangeText={text => handleInputChange('password1', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#6b7280"
        value={formData.password2}
        onChangeText={text => handleInputChange('password2', text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <View style={styles.register}>
            <Text style={styles.registerText}>Sign up</Text>
          </View>
        )}
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
