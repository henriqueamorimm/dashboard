import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Card from './components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userPhotoURL: '',
    userVerified: '',
    userId: '',
  });

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userName = await AsyncStorage.getItem('userName');
        const userPhone = await AsyncStorage.getItem('userPhone');
        const userPhotoURL = await AsyncStorage.getItem('userPhotoURL');
        const userVerified = await AsyncStorage.getItem('userVerified');
        const userId = await AsyncStorage.getItem('userId');

        setUserData({
          userName: userName || '',
          userEmail: userEmail || '',
          userPhone: userPhone || '',
          userPhotoURL: userPhotoURL || '',
          userVerified: userVerified || '',
          userId: userId || '',
        });
      } catch (error) {
        console.error('Erro ao recuperar dados:', error);
      }
    };

    retrieveData();
  }, []);

  const handleLogout = async () => {
    AsyncStorage.clear();
    console.log('Logout concluído Storage Limpo.');
    navigation.navigate('HomePage');
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>Olá, {userData.userName}!</Text>
      </View>
      <View style={styles.cardContainer}>
        <Card title="Telefone" value={userData.userPhone} />
        <Card title="E-mail" value={userData.userEmail} />
        <Card title="ID da conta Uork" value={userData.userId} />
      </View>
     
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 90,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(0,200,255)',
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  logoutButton: {
    backgroundColor: 'rgb(0,200,255)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
