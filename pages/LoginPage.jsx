import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://suaapiloginaqui?email=${email}&senha=${password}`);
      
      if (response.data.includes('404 | Falha no login/Credenciais inválidas.')) {
        Alert.alert('Credenciais da conta inválidas');
      } else {
        const apiKey = 'UORK_KEYfqQ7XDiYG81rQFD2Dhu81KhbVd'; 
        const responseSearch = await axios.get(`https://uork.org/search/status/check-account.php?apikey=${apiKey}&id=${email}`);
        
        if (responseSearch.data && Object.keys(responseSearch.data).length > 0) {
          const { nome, telefone, urlfotoperfil, verificado, id } = responseSearch.data; 
          
          await AsyncStorage.setItem('userName', nome);
          await AsyncStorage.setItem('userPhone', telefone.toString());
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPhotoURL', urlfotoperfil);
          await AsyncStorage.setItem('userVerified', verificado.toString());
          await AsyncStorage.setItem('userId', id.toString());
          
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Dados não encontrados:');
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro ao fazer login');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uork.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Fazer Log-in</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    textAlign: 'center',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'rgb(0,200,255)',
    marginBottom: 20,
  },
});
