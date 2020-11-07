import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CrossContext} from '../components/ContextComp';

import styles from '../styles/ProfilePageStyle';

export default function ProfilePageFn({navigation}) {
  const GlobalState = useContext(CrossContext);
  const {dispatch} = GlobalState;
  
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [memberSince, setMemberSince] = useState('');

  useEffect(() => {
    let user = auth().currentUser;
    if (user) {
      setEmail(user.email);
      setDisplayName(user.displayName);
      setMemberSince(new Date(user.metadata.creationTime).toDateString());
    }
  }, []);

  function signOut() {
    auth()
      .signOut()
      .then(() => {        
        dispatch({type: 'userLoggedOut'});
      })
      .then(navigation.navigate('Front'));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.userInfo}>{email} </Text>
          <Text style={styles.userInfo}>Member since {memberSince} </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <View style={styles.infoContent}>
            <Text style={styles.info}>Edit Addresses</Text>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.infoContent}>
            <Text style={styles.info}>Edit name</Text>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.infoContent}>
            <Text style={styles.info}>Current Orders</Text>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.infoContent}>
            <Text style={styles.info}>Past Orders</Text>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.infoContent}>
            <Text
              style={styles.info}
              onPress={() => {
                signOut();
              }}>
              Log Out
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
