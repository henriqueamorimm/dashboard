import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomePage({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/uorkaa.jpg')} 
        style={styles.profileImage}
      />
      <Text style={styles.welcomeText}>Bem-vindo ao dashboard Uork!</Text>
      <Text style={styles.subText}>Vamos iniciar seu log-in?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ir para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 2,
  },
  subText: {
   fontSize: 19,
   marginBottom: 30
  },
  loginButton: {
    backgroundColor: 'rgb(0,200,255)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
