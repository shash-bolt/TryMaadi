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
  Button
} from 'react-native';

import CartItemComp from '../components/CartItemComp';

import styles from '../styles/SignUpPageStyle';

export default function WelcomeComp() {

  const [displayName,setDisplayName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setisLoading] = useState(false); 

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
        //onPress={() => this.registerUser()}
      />

      <Text 
        style={styles.loginText}
        //onPress={() => this.props.navigation.navigate('Login')}>
        >
        Already Registered? Click here to login
      </Text>                          
    </View>
  );
}
