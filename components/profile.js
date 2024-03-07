import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UserContext from './UserContext'; // Import UserContext for accessing user data

export default function ProfilePage({ navigation }) {
  const { user, setUser } = useContext(UserContext); // Access setUser function from UserContext

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

  // Function to handle logout
  const handleLogout = () => {
    setUser({ userId: null, email: null }); // Setting user's email and userID to null after sign out.
    navigation.navigate('Login'); // Navigate back to the login page after signing out
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
          <View style={styles.userInfo}>
    <Text style={styles.fullName}>{fullName}</Text>
    <Text style={styles.bio}>{bio}</Text>
    {/* Add these lines to display userId and email */}
    <Text style={styles.userDetail}>User ID: {user.userId}</Text>
    <Text style={styles.userDetail}>Email: {user.email}</Text>
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
      
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071525',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  profile: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    borderRadius: 40,
    overflow: 'hidden',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 80,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
  usernameContainer: {
    marginTop: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
    paddingBottom: 6,
  },
  bio: {
    fontSize: 15,
    color: '#fff',
  },
  editModeContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButtonContainer: {
    width:'100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#075EEC',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    width: 250,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
