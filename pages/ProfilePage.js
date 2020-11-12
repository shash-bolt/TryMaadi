import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image, Modal, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';

import {CrossContext} from '../components/ContextComp';
import AddAddressComp from '../components/AddAddressComp';
import AddressItemComp from '../components/AddressItemComp';

import styles from '../styles/ProfilePageStyle';

export default function ProfilePageFn({navigation}) {
  const GlobalState = useContext(CrossContext);
  const {dispatch} = GlobalState;

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [showAddresses, setshowAddresses] = useState(false);
  const [AddressesJSX, setAddressesJSX] = useState();
  const [currAddresses, setCurrAddresses] = useState(new Array());
  const [deleteAddressModal, setdeleteAddressModal] = useState(false);
  const [deleteAddressFire, setDeleteAddressFire] = useState(-1);

  useEffect(() => {
    let user = auth().currentUser;
    if (user) {
      setEmail(user.email);
      setDisplayName(user.displayName);
      setMemberSince(new Date(user.metadata.creationTime).toDateString());
    }
  }, []);

  useEffect(() => {
    if (showAddresses) retreiveAddresses();
  }, [showAddresses]);

  useEffect(() => {
    displayAddresses();
  }, [currAddresses]);

  function signOut() {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: 'userLoggedOut'});
      })
      .then(navigation.navigate('Front'));
  }

  function displayAddresses() {
    setAddressesJSX(
      <FlatList
        data={Object.values(currAddresses)}
        renderItem={({item, index}) => (
          <AddressItemComp
            ListItem={item}
            onButtonPress={() => {
              setDeleteAddressFire(index);
              setdeleteAddressModal(true);
            }}
            currIndex={index}
            selectedIndex={-1}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        decelerationRate="fast"
        indicatorStyle="black"
      />,
    );
  }

  function retreiveAddresses() {
    firestore()
      .collection('UserAddresses')
      .doc(auth().currentUser.email)
      .onSnapshot((querySnapShot) => {
        //console.log(querySnapShot.data());
        if (querySnapShot.exists) {
          setCurrAddresses(querySnapShot.data());
        }
      });
  }

  function deleteAddress() {
    firestore()
      .collection('UserAddresses')
      .doc(auth().currentUser.email)
      .update({
        [Object.keys(currAddresses)[
          deleteAddressFire
        ]]: firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        setDeleteAddressFire(-1);
        setdeleteAddressModal(false);
      });
  }

  function editAddresses() {
    setshowAddresses(true);
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

      <Modal animationType="slide" visible={addAddressModal}>
        <AddAddressComp onButtonPress={() => setAddAddressModal(false)} />
      </Modal>

      <Modal animationType="none" visible={deleteAddressModal}>
        <View style={styles.CartItemContainer}>
          <View style={styles.CartRow}>
            <Text style={styles.CartItemTitle}>
              Do you want to delete the address
            </Text>
          </View>

          <AddressItemComp
            ListItem={Object.values(currAddresses)[deleteAddressFire]}
            onButtonPress={() => {}}
            currIndex={0}
            selectedIndex={-1}
          />

          <View style={styles.CartRow}>
            <Text
              style={styles.CartItemTitle}
              onPress={() => {
                deleteAddress();
              }}>
              Confirm DELETE
            </Text>
            <Text
              style={styles.CartItemTitle}
              onPress={() => {
                setdeleteAddressModal(false);
              }}>
              Exit
            </Text>
          </View>
        </View>
      </Modal>

      <Modal animationType="none" visible={showAddresses} transparent={true}>
        <View style={styles.addressModalContainer}>
          <View style={styles.CartItemContainer}>
            <View style={styles.CartRow}>
              <Text style={styles.CartItemTitle}>Address:</Text>
              <Text
                style={styles.CartItemTitle}
                onPress={() => {
                  setAddAddressModal(true);
                }}>
                Add Address
              </Text>
              <Text
                style={styles.CartItemTitle}
                onPress={() => {
                  setshowAddresses(false);
                }}>
                Close
              </Text>
            </View>
            {AddressesJSX}
          </View>
        </View>
      </Modal>

      <View style={styles.body}>
        <View style={styles.item}>
          <View style={styles.infoContent}>
            <Text
              style={styles.info}
              onPress={() => {
                editAddresses();
              }}>
              My Addresses
            </Text>
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
