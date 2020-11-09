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
  ToastAndroid,
} from 'react-native';

import {CalendarList} from 'react-native-calendars';
import {Picker} from '@react-native-community/picker';
import {CrossContext} from '../components/ContextComp';

import styles from '../styles/ProductPageStyle';

export default function ProductPageFn({route, navigation}) {
  const [calendarData, setCalendarData] = useState('{}');
  const [noOfUnits, setNoOfUnits] = useState(2);
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startEndToggle, setStartEndToggle] = useState(true); // true = start, false = end;
  const [minDate, setMinDate] = useState('');
  const [bookingPossible, setBookingPossible] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const GlobalState = useContext(CrossContext);
  const {dispatch} = GlobalState;

  useEffect(() => {
    let currDate = new Date();
    var date = ('0' + currDate.getDate()).slice(-2); //Current Date
    var month = ('0' + (currDate.getMonth() + 1)).slice(-2); //Current Month
    var year = currDate.getFullYear(); //Current Year
    setMinDate(year + '-' + month + '-' + date);
    setStartDay(year + '-' + month + '-' + date);
    setEndDay(year + '-' + month + '-' + date);
  }, []);

  useEffect(() => {
    markDates();
    //console.log(calendarData);
    setTotalCost(costCalculator());
  }, [startEndToggle, noOfUnits]);

  const currProduct = {
    itemPic: 'https://picsum.photos/200', // Needs to be added to the json file
    itemName: route.params.itemName,
    itemID: 101090, // Needs to be added to the json file
    itemDescription: route.params.itemDescription,
    maxitemAvailable: 4, // Needs to be added to the json file
    itemCost: route.params.itemCost,
  };

  const dateArr = require('../assets/dates.json'); // The json file

  function markDates() {
    let current = {
      selected: true,
      endingDay: true,
      startingDay: true,
      color: 'lightblue',
    };
    let redStatus = {
      marked: true,
      dotColor: 'red',
      textColor: 'lightgrey',
      disabled: true,
      disableTouchEvent: true,
    };
    let disabledStatus = {
      textColor: 'lightgrey',
      disabled: true,
      disableTouchEvent: true,
    };
    let greenStatus = {marked: true, dotColor: 'green', textColor: 'black'};
    let orangeStatus = {marked: true, dotColor: 'orange', textColor: 'black'};
    var result = {};
    var start = {
      selected: true,
      endingDay: false,
      startingDay: true,
      color: 'lightblue',
    };
    var end = {
      selected: true,
      endingDay: true,
      startingDay: false,
      color: 'lightblue',
    };
    var middle = {
      selected: true,
      endingDay: false,
      startingDay: false,
      color: 'lightblue',
    };
    var bookingPossibleCode = 0;
    //console.log(new Date(minDate)+'--->'+new Date(minDate).getTime())
    if (startDay === endDay) {
      for (var i = 0; i < dateArr.calendarData.length; i++) {
        //console.log(new Date(dateArr.calendarData[i].date) +'---'+ new Date(dateArr.calendarData[i].date).getTime())
        if (new Date(dateArr.calendarData[i].date) < new Date(minDate)) {
          //console.log('Here');
          result[dateArr.calendarData[i].date] = disabledStatus;
          continue;
        }
        let status = redStatus;
        if (dateArr.calendarData[i].booking.green >= noOfUnits)
          status = greenStatus;
        else if (
          dateArr.calendarData[i].booking.orange +
            dateArr.calendarData[i].booking.green >=
          noOfUnits
        ) {
          status = orangeStatus;
        }
        if (dateArr.calendarData[i].date === startDay) {
          if (status == redStatus) bookingPossibleCode = 2;
          else if (status == orangeStatus) bookingPossibleCode = 1;
          else if (status == greenStatus) bookingPossibleCode = 0;

          status = {...status, ...current};
        }

        result[dateArr.calendarData[i].date] = status;
      }
      console.log(startDay + '<---->' + endDay);
      setCalendarData(JSON.stringify(result));
    } else if (new Date(endDay) > new Date(startDay)) {
      var toggle = false;
      for (var i = 0; i < dateArr.calendarData.length; i++) {
        if (new Date(dateArr.calendarData[i].date) < new Date(minDate)) {
          result[dateArr.calendarData[i].date] = disabledStatus;
          continue;
        }

        let status = redStatus;
        if (dateArr.calendarData[i].booking.green >= noOfUnits)
          status = greenStatus;
        else if (
          dateArr.calendarData[i].booking.orange +
            dateArr.calendarData[i].booking.green >=
          noOfUnits
        ) {
          status = orangeStatus;
        }
        //=================setting statuses==================================

        if (dateArr.calendarData[i].date === startDay) {
          if (status == redStatus) bookingPossibleCode = 2;
          else if (status == orangeStatus) bookingPossibleCode = 1;
          else if (status == greenStatus) bookingPossibleCode = 0;

          status = {...status, ...start};
          toggle = true;
        }

        if (toggle == true) {
          if (status == redStatus) bookingPossibleCode = 2;
          else if (status == orangeStatus && bookingPossibleCode == 0)
            bookingPossibleCode = 1;
          else if (status == greenStatus && bookingPossibleCode == 0)
            bookingPossibleCode = 0;

          status = {...status, ...middle};
        }

        if (dateArr.calendarData[i].date === endDay) {
          status = {...status, ...end};
          toggle = false;
        }

        result[dateArr.calendarData[i].date] = status;
      }
      console.log(startDay + '<---->' + endDay);
      setCalendarData(JSON.stringify(result));
    } else if (new Date(endDay) < new Date(startDay)) {
      setEndDay(startDay);

      for (var i = 0; i < dateArr.calendarData.length; i++) {
        if (new Date(dateArr.calendarData[i].date) < new Date(minDate)) {
          result[dateArr.calendarData[i].date] = disabledStatus;
          continue;
        }

        let status = redStatus;
        if (dateArr.calendarData[i].booking.green >= noOfUnits)
          status = greenStatus;
        else if (
          dateArr.calendarData[i].booking.orange +
            dateArr.calendarData[i].booking.green >=
          noOfUnits
        ) {
          status = orangeStatus;
          if (bookingPossibleCode == 0) bookingPossibleCode = 1;
        } else {
          bookingPossibleCode = 2;
        }

        if (dateArr.calendarData[i].date === startDay)
          if (status == redStatus) bookingPossibleCode = 2;
          else if (status == orangeStatus) bookingPossibleCode = 1;
          else if (status == greenStatus) bookingPossibleCode = 0;

        status = {...status, ...current};
        result[dateArr.calendarData[i].date] = status;
      }
      console.log(startDay + '<---->' + endDay);
      setCalendarData(JSON.stringify(result));
    }

    setBookingPossible(bookingPossibleCode);
  }

  function costCalculator() {
    var totalSum = 0;
    var day1 = new Date(startDay);
    var day2 = new Date(endDay);
    var numDays = (day2 - day1) / (1000 * 60 * 60 * 24) + 1;

    if (numDays < 7) {
      totalSum = Math.ceil(numDays * currProduct.itemCost.daily);
    } else if (numDays >= 7 && numDays < 30) {
      totalSum = Math.ceil((numDays * currProduct.itemCost.weekly) / 7);
    } else if (numDays >= 30) {
      totalSum = Math.ceil((numDays * currProduct.itemCost.monthly) / 30);
    }

    return totalSum * noOfUnits;
  }

  function addToCart() {
    /*
    1. First, get the most current data from database. If green, then
    2. Send the orange flag to the database. 
    3. Keep the timer for 5 minutes. 
      a. Also, in cart, have the product set to expired after that duration.
      b. After 5 minutes, let the SERVER send the green flag to the database. 
    5. If product is rented within the 5 minutes, then, send the red flag to the database.

    6. Keep an array of timers with
    */
    const bookingParams = {
      itemPic: currProduct.itemPic,
      itemName: currProduct.itemName,
      itemID: currProduct.itemID,
      startDay: startDay,
      endDay: endDay,
      timeBooked: new Date(),
      productCost: totalCost,
      noOfUnits: noOfUnits,
      active: true,
    };
    console.log(bookingParams);
    dispatch({type: 'addToCart',
    payload: {
      item:bookingParams
  }
  });
  }

  function pickers() {
    {
      var pickerValues = [];
      for (var i = 1; i <= currProduct.maxitemAvailable; i++) {
        pickerValues.push(
          <Picker.Item label={i.toString()} value={i} key={i} />,
        );
      }
      return pickerValues;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.ProductContainer}>
        <ScrollView>
          <Image
            source={{uri: currProduct.itemPic}}
            style={styles.ProductImage}
            resizeMode="contain"
          />
          <Text style={styles.ProductTitle}>{currProduct.itemName}</Text>
          <Text style={styles.ProductDesc}>{currProduct.itemDescription}</Text>
          <Text style={styles.InfoDateSet}>No. of units:</Text>
          <Picker
            selectedValue={noOfUnits}
            //style={{height: 50, width: 100}}
            onValueChange={(itemValue) => setNoOfUnits(itemValue)}>
            {pickers()}
          </Picker>
          <Text style={styles.InfoDateSet}>
            Info: {startEndToggle ? 'Set the Start Date' : 'Set the End Date'}
          </Text>
          <Text style={styles.DatesSetStyle}>
            Dates set: {startDay} to {endDay}
          </Text>

          <CalendarList
            futureScrollRange={3}
            pastScrollRange={0}
            horizontal={true}
            markedDates={JSON.parse(calendarData)}
            onDayPress={(day) => {
              console.log(day);
              if (startEndToggle) {
                setStartDay(day.dateString);
                setStartEndToggle(false);
              } else {
                setEndDay(day.dateString);
                setStartEndToggle(true);
              }
            }}
            onDayLongPress={(day) => {
              console.log('Long Press');
            }}
            markingType={'period'}
            minDate={minDate}
          />

          <Text>
            Cost Calculator: {totalCost} -- {bookingPossible}
          </Text>

          <View style={styles.AddCartContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                if (GlobalState.state.isLoggedIn) {
                  if (bookingPossible == 0) {
                    ToastAndroid.show(
                      'Product added to Cart. Rent it within 5 minutes..!!.',
                      ToastAndroid.LONG,
                    );
                    addToCart();
                  } else if (bookingPossible == 1) {
                    ToastAndroid.show(
                      'Others are renting this product. Try again in 2 minutes.',
                      ToastAndroid.LONG,
                    );
                  } else if (bookingPossible == 2) {
                    ToastAndroid.show(
                      'This product is not available for the selected dates.',
                      ToastAndroid.LONG,
                    );
                  }
                }else{
                  navigation.navigate("Login");
                }
              }}
              disabled={totalCost == 0 && GlobalState.state.isLoggedIn}>
              <Text style={styles.buttonContainerText}>
                {GlobalState.state.isLoggedIn ? 'Add to Cart' : 'Login to Rent'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.BottomContainer}></View>
    </View>
  );
}
