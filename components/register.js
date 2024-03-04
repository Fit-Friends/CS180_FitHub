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
      <Text style={styles.welcomeText}>Welcome to FitHub! Let's get you registered.</Text>
      <Text style={styles.heading}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#6b7280"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.heading}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#6b7280"
        value={formData.password1}
        onChangeText={text => handleInputChange('password1', text)}
        secureTextEntry
      />
      <Text style={styles.heading}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#6b7280"
        value={formData.password2}
        onChangeText={text => handleInputChange('password2', text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} disabled={isLoading} style={styles.registerButton}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <View style={styles.register}>
            <Text style={styles.registerText}>Sign up</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.signup}>
            Click Here to{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Return To Login</Text>
          </Text>
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
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    paddingTop: 10,
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
  registerButton: {
    paddingTop: 20,
  },
  register: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signup: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
