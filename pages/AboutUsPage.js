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

export default function WelcomeComp() {

  const [displayName,setDisplayName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setisLoading] = useState(false);

  return (
    <View style={styles.container}>  
      <Text 
        style={styles.loginText}
        //onPress={() => this.props.navigation.navigate('Signup')}
        >
       Account Page
      </Text>               

      <Text 
        style={styles.loginText}
        //onPress={() => this.props.navigation.navigate('Signup')}
        >
        Forgot Password ?
      </Text>             
    </View>
  );
}
