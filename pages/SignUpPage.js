import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
  Button,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import styles from '../styles/SignUpPageStyle';

export default function WelcomeComp({navigation}) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerUser() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: displayName,
        });
        alert('User registered successfully!');
        console.log(res);
        console.log('========================================================')
        setDisplayName('');
        setEmail('');
        setPassword('');
        navigation.navigate('Login');
      })
      .catch((error) => {
        alert(error.message)     
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
        value={displayName}
        onChangeText={(val) => setDisplayName(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />
      <Button
        color="#3740FE"
        title="Sign up with us"
        onPress={() => registerUser()}
      />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Already Registered? Click here to login
      </Text>
    </View>
  );
}
