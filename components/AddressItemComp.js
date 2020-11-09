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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.onButtonPress(props.ListItem);
        }}>
        <View style={styles.LIcontainer}>          
          <View>
            <Text>
              {props.ListItem.address_line_1}
            </Text>
            <Text>
              {props.ListItem.address_line_2}
            </Text>
            <Text>
              {props.ListItem.city_town}
            </Text>
            <Text>
              {props.ListItem.state}
            </Text>
            <Text>
              {props.ListItem.contact_no}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
