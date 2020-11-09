import React, {useState, useEffect, useContext} from 'react';
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
  ToastAndroid,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import styles from '../styles/AddAddressCompStyle';

export default function WelcomeComp(props) {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city_town, setCity_town] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState();
  const [contactNo, setContactNo] = useState();

  function addtoDb(){
    let curTime = new Date().getTime();
    firestore()
      .collection('UserAddresses')
      .doc(auth().currentUser.email)
      .set({[curTime]: {
        address_line_1: address1,
        address_line_2: address2,
        city_town: city_town,
        contact_no: contactNo,
        pincode: pincode,
        state:state
      }},{ merge:true})
      .then(()=>{
        ToastAndroid.show(
          'New Address added.',
          ToastAndroid.SHORT,
        );
        props.onButtonPress();
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Address 1"
        maxLength={20}
        value={address1}
        onChangeText={(val) => setAddress1(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Address 2"
        maxLength={20}
        value={address2}
        onChangeText={(val) => setAddress2(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="City or Town"
        maxLength={20}
        value={city_town}
        onChangeText={(val) => setCity_town(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="State"
        maxLength={20}
        value={state}
        onChangeText={(val) => setState(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Pincode"
        maxLength={6}
        value={pincode}
        onChangeText={(val) => setPincode(val)}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Contact Number"
        maxLength={10}
        value={contactNo}
        onChangeText={(val) => setContactNo(val)}
        keyboardType="number-pad"
      />
      <Button color="#3740FE" title="Add address" onPress={() => addtoDb()} />

      <Text
        style={styles.loginText}
        onPress={() => props.onButtonPress()}>
        Cancel
      </Text>
    </View>
  );
}
