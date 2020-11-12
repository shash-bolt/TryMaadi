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

import styles from '../styles/AddressItemCompStyle';

export default function AddressItemComp(props) {

  if(props.ListItem === undefined){
    return null
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.onButtonPress(props.ListItem);
        }}>
        <View
          style={
            props.currIndex === props.selectedIndex
              ? {...styles.LIcontainer, backgroundColor: 'lightblue'}
              : styles.LIcontainer
          }>
          <View>
            <Text>{props.ListItem.address_line_1}</Text>
            <Text>{props.ListItem.address_line_2}</Text>
            <Text>{props.ListItem.city_town}</Text>
            <Text>{props.ListItem.state}</Text>
            <Text>{props.ListItem.contact_no}</Text>
            {props.currIndex === props.selectedIndex ? (
              <Text>---- Products will be delivered to this address ----</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
