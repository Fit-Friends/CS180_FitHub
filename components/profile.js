import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePage({ navigation }) {
  const [profileImage, setProfileImage] = useState('https://avatarfiles.alphacoders.com/336/336672.png'); // Default profile picture

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.profileImage}
              source={{ uri: profileImage }}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>saitama_san</Text>
        </View>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.fullName}>Saitama</Text>
        <Text style={styles.bio}>Passionate Weight Lifter | 23</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>1.2k followers</Text>
          <Text style={styles.stat}>258 following</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071525',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  bio: {
    fontSize: 14,
    color: '#fff',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  stat: {
    marginRight: 20,
    fontSize: 14,
    color: '#fff',
  },
});
