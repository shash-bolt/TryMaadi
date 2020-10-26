import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import styles from '../styles/ProductPageStyle';

let screenHeight = Dimensions.get('window').height - StatusBar.currentHeight;

export default function WelcomeComp() {
  const [calendarData, setCalendarData] = useState('{}');
  const [noOfDays, setNoOfDays] = useState(2);
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startEndToggle, setStartEndToggle] = useState(true); // true = start, false = end;

  useEffect(() => {
    //setProducts(updateProducts());
    console.log('useEffect');
    let currDate = new Date();
    var date = currDate.getDate(); //Current Date
    var month = currDate.getMonth() + 1; //Current Month
    var year = currDate.getFullYear(); //Current Year
    setStartDay(year + '-' + month + '-' + date);
    setEndDay(year + '-' + month + '-' + date);
    markDates();
  }, []);

  const currProd = require('../assets/products.json');
  const dateArr = require('../assets/dates.json');

  function markDates() {
    // var object = dateArr.calendarData.reduce((obj, item) => {
    //   let color = 'red';
    //   if (item.booking.green >= noOfDays) color = 'green';
    //   else if (item.booking.orange + item.booking.green >= noOfDays)
    //     color = 'orange';
    //   else color = 'red';
    //   ((obj[item.date] = color), obj), {};
    // });
    //((obj, item) => (obj[item.] = item.value, obj) ,{});

    //convert - old way
    var result = {};
    if (startDay === endDay) {
      var current = {
        selected: true,
        endingDay: true,
        startingDay: true,
        color: 'lightblue',
      };
      for (var i = 0; i < dateArr.calendarData.length; i++) {
        let status = {
          marked: true,
          dotColor: 'red',
          textColor: 'lightgrey',
          disabled: true,
          disableTouchEvent: true,
        };
        if (dateArr.calendarData[i].booking.green >= noOfDays)
          status = {marked: true, dotColor: 'green', textColor: 'black'};
        else if (
          dateArr.calendarData[i].booking.orange +
            dateArr.calendarData[i].booking.green >=
          noOfDays
        )
          status = {marked: true, dotColor: 'orange', textColor: 'black'};
        //selected: true, marked: true, selectedColor: 'blue'
        if (dateArr.calendarData[i].date === startDay) {
          status = {...status, ...current};
          console.log(status);
        }

        result[dateArr.calendarData[i].date] = status;
      }
      console.log(startDay + '<---->' + endDay);

      setCalendarData(JSON.stringify(result));
    } else if (new Date(endDay) > new Date(startDay)) {
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
      var toggle = false;
      for (var i = 0; i < dateArr.calendarData.length; i++) {
        let status = {
          marked: true,
          dotColor: 'red',
          textColor: 'lightgrey',
          disabled: true,
          disableTouchEvent: true,
        };
        if (dateArr.calendarData[i].booking.green >= noOfDays)
          status = {marked: true, dotColor: 'green', textColor: 'black'};
        else if (
          dateArr.calendarData[i].booking.orange +
            dateArr.calendarData[i].booking.green >=
          noOfDays
        )
          status = {marked: true, dotColor: 'orange', textColor: 'black'};

        //=================setting statuses==================================

        if (dateArr.calendarData[i].date === startDay) {
          status = {...status, ...start};
          toggle = true;
        }

        if (toggle == true) {
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
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.CalenderContainer}>
        <CalendarList
          futureScrollRange={3}
          pastScrollRange={0}
          horizontal={true}
          markedDates={JSON.parse(calendarData)}
          // markedDates={{
          //   '2020-11-01': {textColor: 'green'},
          //   '2020-11-02': {selected: true, startingDay: true, color: 'green'},
          //   '2020-11-03': {
          //     selected: true,
          //     endingDay: false,
          //     startingDay: false,
          //     color: 'green',
          //   },
          //   '2020-11-04': {
          //     selected: true,
          //     endingDay: true,
          //     color: 'green',
          //   },

          //   //selected : true, endingDay: false, startingDay: false, color: "green"
          //   '2020-11-05': {
          //     disabled: true,
          //     startingDay: true,
          //     color: 'green',
          //     endingDay: true,
          //   },
          // }}
          onDayPress={(day) => {
            if (startEndToggle) {
              setStartDay(day.dateString);
              setStartEndToggle(false);
              markDates();
            } else {
              setEndDay(day.dateString);
              setStartEndToggle(true);
              markDates();
            }
          }}
          markingType={'period'}
        />
      </View>
    </View>
  );
}
