import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons
import axios from 'axios';
import UserContext from './UserContext';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [userId, setUserId] = useState(null);
  
  const { setUser } = useContext(UserContext);

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://seannas.myqnapcloud.com:7010/login/', {
        email: form.email,
        password: form.password,
      });

      console.log(response.data);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
          const idResponse = await axios.post('http://seannas.myqnapcloud.com:7010/getid', { "email": form.email });
          console.log('User ID fetched:', idResponse.data.id);

          setUser({ userId: idResponse.data.id, email: form.email });
          navigation.navigate('Home', {
            screen: 'Main',
            params: { userId: idResponse.data.id, email: form.email }, 
          });      
        } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#071525' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.postimg.cc/1zrHQNhS/DALL-E-2024-02-08-23-54-39-Design-a-sleek-and-modern-logo-for-a-fitness-app-focused-on-bodyweight.webp' }}
            style={styles.headerImg}
          />
          <Text style={styles.title}>Sign in to FitHub</Text>

          <Text style={styles.Label}>Email address</Text>
          <TextInput
            placeholder="john@example.com"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.Label}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="*********"
              placeholderTextColor="#6b7280"
              style={styles.passwordInput}
              value={form.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on state
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signin}>
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign in</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.signup}>
            Not Registered?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 58,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  Label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 26,
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signin: {
    marginVertical: 8,
  },
  signup: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  passwordInput: {
    flex: 1,
    fontWeight: '500',
    color: '#222',
    borderRadius: 12,
    fontSize: 15,
    height: 44,
  },
  eyeIcon: {
    marginLeft: 8,
  },
});
