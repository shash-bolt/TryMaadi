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
} from 'react-native';

import CartItemComp from '../components/CartItemComp';

import styles from '../styles/CartPageStyle';

export default function WelcomeComp() {
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
  const [currCart, setCurrCart] = useState(new Array);
  const [rentalItemsJSX, setRentalItemsJSX] = useState();

  useEffect(() => {
    transportFeeCalculator();
    rentalFeeCalculator();
    displayrentalItems();    
  }, [timerSwitch, currCart]);

  useEffect(()=>{
    setCurrCart([
      {
        endDay: '2020-11-01',
        itemID: 101090,
        itemName: 'Sony PlayStation 5',
        itemPic: 'https://picsum.photos/200',
        noOfUnits: 1,
        productCost: 1200,
        startDay: '2020-10-30',
        timeBooked: '2020-11-01T19:55:57.665Z',
        active: true,
      },
      {
        endDay: '2020-11-03',
        itemID: 101090,
        itemName: 'Sony PlayStation 5',
        itemPic: 'https://picsum.photos/200',
        noOfUnits: 2,
        productCost: 2400,
        startDay: '2020-11-30',
        timeBooked: '2020-11-01T19:55:27.108Z',
        active: true,
      },
      {
        endDay: '2020-11-05',
        itemID: 101090,
        itemName: 'Sony PlayStation 5',
        itemPic: 'https://picsum.photos/200',
        noOfUnits: 3,
        productCost: 5200,
        startDay: '2020-11-03',
        timeBooked: '2020-11-01T19:56:27.108Z',
        active: true,
      },
      {
        endDay: '2020-11-05',
        itemID: 101090,
        itemName: 'Sony PlayStation 5',
        itemPic: 'https://picsum.photos/200',
        noOfUnits: 4,
        productCost: 5200,
        startDay: '2020-10-30',
        timeBooked: '2020-11-01T19:57:27.108Z',
        active: true,
      },
      {
        endDay: '2020-11-05',
        itemID: 101090,
        itemName: 'Sony PlayStation 5',
        itemPic: 'https://picsum.photos/200',
        noOfUnits: 5,
        productCost: 5200,
        startDay: '2020-10-30',
        timeBooked: '2020-11-01T19:54:27.108Z',
        active: true,
      },
    ]);

  },[])
  
  function transportFeeCalculator(){
    // May need to download data from dB for prior orders.

    let maxUnitsPerOrder = 3;
    let transportCostPerOrder = 100

    let transportMap = new Map();
    let totalCost = 0;
    for(let i=0;i<currCart.length;i++){
      if(currCart[i].active == false) continue;

      if(transportMap.has(currCart[i].startDay)){
        transportMap.set(currCart[i].startDay, transportMap.get(currCart[i].startDay)+currCart[i].noOfUnits);
      } else{
        transportMap.set(currCart[i].startDay, currCart[i].noOfUnits);
      }
    }

    for(let mult of transportMap.values()){
      totalCost+=(Math.ceil(mult/maxUnitsPerOrder)*transportCostPerOrder)
    }

    setTransportAmt(totalCost);
  }

  function rentalFeeCalculator(){    

    let rentalMap = new Map();
    
    for(let i=0;i<currCart.length;i++){
      if(currCart[i].active == false) continue;

      if(rentalMap.has(currCart[i].startDay)){ 
        rentalMap.set(currCart[i].startDay, rentalMap.get(currCart[i].startDay)+currCart[i].productCost);
      } else{
        rentalMap.set(currCart[i].startDay, currCart[i].productCost);
      }
    }
    let rentJSX = new Array;
    var rentalMapAsc = new Map([...rentalMap.entries()].sort());
    for(let entry of rentalMapAsc){
      rentJSX.push(
        <Text key={entry[0]}>
          {entry[0]} ----- {entry[1]}
        </Text>
      )
    }
    setRentalAmt(rentJSX);
  }

  function handleModal(item) {
    console.log('Button pressed');
    console.log(JSON.stringify(item));
  }

  function timerOver(index){
    var tempCart = currCart;
    tempCart[index].active = false;
    setCurrCart(tempCart);
    setTimerSwitch(!timerSwitch);
  }

  function displayrentalItems(){

    setRentalItemsJSX(
      <FlatList
              data={currCart}
              renderItem={({item,index}) => (
                <CartItemComp
                  ListItem={item}
                  onButtonPress={(item) => handleModal(item)}
                  timerOver={()=>{timerOver(index)}}
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
            />
    )

  }

  return (
    <View style={styles.container}>
      <View style={styles.ProductContainer}>
        <ScrollView>
          <View style={styles.CartItemContainer}>
            <Text style={styles.CartItemTitle}>Cart Items:</Text>
            {rentalItemsJSX}
          </View>
          <View style={styles.CartItemContainer}>
          <Text style={styles.CartItemTitle}>Address:</Text>
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
