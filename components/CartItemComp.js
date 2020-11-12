import React, {Component, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ListItem,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import CountDown from 'react-native-countdown-component';

import styles from '../styles/CartItemCompStyle';

export default function IngredientListItemComp(props) {
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [countDown, setCountDown] = useState();
  const [timerJSX, setTimerJSX] = useState();

  useEffect(() => {
    setTimer();
  }, []);

  useEffect(() => {
    
    timerDisplay(props.ListItem.active);
  }, [countDown]);

  function setTimer() {
    let timeDiff =
      new Date(props.ListItem.timeBooked).getTime() +
      timerMinutes * 60000 -
      new Date().getTime();
      if(timeDiff<=0) props.timerOver();
    setCountDown(Math.ceil(timeDiff / 1000));
  }

  function timerDisplay(active) {
    if (active) {
      console.log(countDown);
      setTimerJSX(
        <CountDown
          until={countDown}
          onFinish={() => props.timerOver()}
          onPress={() => {setTimer()}}
          timeLabels={{m: null, s: null}}
          timeToShow={['M', 'S']}
          size={10}
          showSeparator
        />,
      );
    } else {
      setTimerJSX(<Text>Timer Done</Text>);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.onButtonPress(props.ListItem);
        }}>
        <View style={styles.LIcontainer}>
          <Image
            source={{uri: props.ListItem.itemPic}}
            style={styles.LIImage}
            resizeMode="stretch"
          />
          <View
            style={
              props.ListItem.active
                ? {...styles.LIDesc}
                : {...styles.LIDesc, backgroundColor: 'pink'}
            }>
            <Text style={styles.LITitle}>{props.ListItem.itemName}</Text>
            <Text style={styles.LIText}>
              {props.ListItem.startDay} to {props.ListItem.endDay}
            </Text>
            <Text style={styles.LIText}>
              No of Units: {props.ListItem.noOfUnits}
            </Text>
            {props.ListItem.active && (
              <Text style={styles.LITitle}>
                Cost: {props.ListItem.productCost}
              </Text>
            )}
            {!props.ListItem.active && (
              <Text style={styles.LITitle}>Product removed</Text>
            )}
            <View style={styles.optionContainer}>
              <TouchableOpacity 
                style={styles.cartOptionBox}
                onPress={() => {
                  props.deleteItem();
                }}  
              >
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartOptionBox}>
                <Text>Rent Later</Text>
              </TouchableOpacity>
              <View style={styles.timerOptionBox}>{timerJSX}</View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
