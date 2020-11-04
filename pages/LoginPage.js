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

import styles from '../styles/LoginPageStyle';

export default function WelcomeComp({ navigation }) {

  const [displayName,setDisplayName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setisLoading] = useState(false);

  return (
    <View style={styles.container}>  
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
        title="Sign in"
       // onPress={() => this.userLogin()}
      />   

      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('SignUp')}
        >
        Don't have account? Click here to signup
      </Text>               

      <Text 
        style={styles.loginText}        
        >
        Forgot Password ?
      </Text>   
      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('Front')}        
        >
        Continue as Guest..
      </Text>            
    </View>
  );
}
