import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePage({ navigation }) {
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('user_name');
  const [fullName, setFullName] = useState('Name');
  const [bio, setBio] = useState('Bio');

  useEffect(() => {
    (async () => {
      // Requesting permission to access photo gallery
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access the photo gallery.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  // Function to save changes to backend or local storage if necessary:
  const saveChanges = () => {
    setEditMode(false); // Exit editing mode
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.profile}>
          <View style={styles.profileImageContainer}>
            {image ? (
                <Image
                  style={styles.profileImage}
                  source={{ uri: image }}
                />
              ) : (
                <Ionicons name="person-circle-outline" size={100} color="#ccc" />
              )}
            <View style={styles.editIconContainer}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </View>
          </View>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{"@" + username}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      {editMode && (
        <View style={styles.editModeContainer}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter Username"
          />
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter Personal Name"
          />
          <TextInput
            style={styles.input}
            value={bio}
            onChangeText={setBio}
            placeholder="Enter Bio"
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.editButtonContainer}>
      {!editMode && (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071525', // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White color for text
    padding: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space out filter buttons
    marginVertical: 10,
  },
  timeframeButtons: {
    flexDirection: 'row',
    backgroundColor: '#2A2E43', // Slightly lighter dark background for button group
    borderRadius: 20, // Rounded corners
    overflow: 'hidden', // Ensures child components (buttons) adhere to border radius
  },
  exerciseButtons: {
    flexDirection: 'row',
    backgroundColor: '#2A2E43',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonStyle: (active, type) => ([
    {
      backgroundColor: active === type ? '#4CAF50' : '#333A56', // Active buttons are green
      paddingHorizontal: 15,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
  ]),
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userSection: {
    backgroundColor: '#1F2235', // Slightly lighter than container for contrast
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row', // Make user info horizontal
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space between user info and steps
  },
  userTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recordDate: {
    fontSize: 16,
    color: '#B2B5C1', // Lighter grey for less emphasis
    marginBottom: 5,
  },
  recordText: {
    fontSize: 18,
    color: '#FFFFFF', // White for important numbers
    fontWeight: 'bold',
  },
  error: {
    color: '#FF0000', // Bright red for errors
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

