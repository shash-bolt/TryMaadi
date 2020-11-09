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
  Modal,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import CartItemComp from '../components/CartItemComp';
import AddressItemComp from '../components/AddressItemComp';
import AddAddressComp from '../components/AddAddressComp';

import {CrossContext} from '../components/ContextComp';

import styles from '../styles/CartPageStyle';

export default function WelcomeComp({navigation}) {
  const [calendarData, setCalendarData] = useState('{}');
  const [noOfDays, setNoOfDays] = useState(2);
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startEndToggle, setStartEndToggle] = useState(true); // true = start, false = end;
  const [minDate, setMinDate] = useState('');
  const [bookingPossible, setBookingPossible] = useState(0);
  const [transportAmt, setTransportAmt] = useState();
  const [rentalAmt, setRentalAmt] = useState();
  const [timerSwitch, setTimerSwitch] = useState(true);
  const [currCart, setCurrCart] = useState(new Array());
  const [rentalItemsJSX, setRentalItemsJSX] = useState();
  const [currAddresses, setCurrAddresses] = useState(new Array());
  const [AddressesJSX, setAddressesJSX] = useState();
  const [addressDelta, setAddressDelta] = useState(true);
  const [addressModal, setAddressModal] = useState(false);

  const GlobalState = useContext(CrossContext);
  const {dispatch} = GlobalState;

  useEffect(() => {
    console.log('useeffect in CartPage');
    transportFeeCalculator();
    rentalFeeCalculator();
    displayrentalItems();
  }, [timerSwitch, GlobalState.state.cartArray.length]);

  useEffect(() => {
    setCurrCart(GlobalState.state.cartArray);
  }, [GlobalState.state.cartArray.length]);

  useEffect(() => {
    retreiveAddresses();
  }, [addressModal]);

  useEffect(() => {
    displayAddresses();
  }, [addressDelta]);

  function transportFeeCalculator() {
    // May need to download data from dB for prior orders.

    let maxUnitsPerOrder = 3;
    let transportCostPerOrder = 100;

    let transportMap = new Map();
    let totalCost = 0;
    for (let i = 0; i < currCart.length; i++) {
      if (currCart[i].active == false) continue;

      if (transportMap.has(currCart[i].startDay)) {
        transportMap.set(
          currCart[i].startDay,
          transportMap.get(currCart[i].startDay) + currCart[i].noOfUnits,
        );
      } else {
        transportMap.set(currCart[i].startDay, currCart[i].noOfUnits);
      }
    }

    for (let mult of transportMap.values()) {
      totalCost += Math.ceil(mult / maxUnitsPerOrder) * transportCostPerOrder;
    }

    setTransportAmt(totalCost);
  }

  function rentalFeeCalculator() {
    let rentalMap = new Map();

    for (let i = 0; i < currCart.length; i++) {
      if (currCart[i].active == false) continue;

      if (rentalMap.has(currCart[i].startDay)) {
        rentalMap.set(
          currCart[i].startDay,
          rentalMap.get(currCart[i].startDay) + currCart[i].productCost,
        );
      } else {
        rentalMap.set(currCart[i].startDay, currCart[i].productCost);
      }
    }
    let rentJSX = new Array();
    var rentalMapAsc = new Map([...rentalMap.entries()].sort());
    for (let entry of rentalMapAsc) {
      rentJSX.push(
        <Text key={entry[0]}>
          {entry[0]} ----- {entry[1]}
        </Text>,
      );
    }
    setRentalAmt(rentJSX);
  }

  function goToItem(item) {
    console.log('Button pressed');
    console.log(JSON.stringify(item));
    navigation.navigate('Front');
  }

  function selectAddress(item) {
    console.log('Button pressed');
    console.log(JSON.stringify(item));
  }

  function timerOver(index) {
    var tempCart = currCart;
    tempCart[index].active = false;
    setCurrCart(tempCart);
    setTimerSwitch(!timerSwitch);
  }

  function displayrentalItems() {
    setRentalItemsJSX(
      <FlatList
        data={currCart}
        renderItem={({item, index}) => (
          <CartItemComp
            ListItem={item}
            onButtonPress={(item) => goToItem(item)}
            timerOver={() => {
              timerOver(index);
            }}
            deleteItem={() => {
              dispatch({
                type: 'removeFromCart',
                payload: {
                  index: index,
                },
              });
            }}
          />
        )}
        keyExtractor={(item, index) =>
          index.toString() + item.itemID + item.timeBooked
        }
        scrollEnabled={true}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        decelerationRate="fast"
        indicatorStyle="white"
      />,
    );
  }

  function displayAddresses() {
    setAddressesJSX(
      <FlatList
        data={currAddresses}
        renderItem={({item, index}) => (
          <AddressItemComp
            ListItem={item}
            onButtonPress={(item) => selectAddress(item)}
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
        console.log(querySnapShot.data())
        setCurrAddresses(Object.values(querySnapShot.data()));
        setAddressDelta(!addressDelta);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.ProductContainer}>

        <Modal animationType="slide" visible={addressModal}>
          <AddAddressComp 
             onButtonPress={() => setAddressModal(false)}
          />
        </Modal>

        <ScrollView>
          <View style={styles.CartItemContainer}>
            <Text style={styles.CartItemTitle}>Cart Items:</Text>
            {rentalItemsJSX}
          </View>
          <View style={styles.CartItemContainer}>
            <View style={styles.CartRow}>
              <Text style={styles.CartItemTitle}>Address:</Text>
              <Text
                style={styles.CartItemTitle}
                onPress={() => {
                  setAddressModal(true);
                }}>
                Add Address
              </Text>
            </View>

            {AddressesJSX}
          </View>

          <View>
            <Text>Amount to be paid to Delivery-person on:</Text>
            {rentalAmt}
            <Text>Transportation fees (Non-refundable): {transportAmt}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.AddCartContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <Text style={styles.buttonContainerText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.BottomContainer}></View>
    </View>
  );
}
