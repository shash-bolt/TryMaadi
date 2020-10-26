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
import styles from '../styles/ListItemCompStyle';

export default function IngredientListItemComp(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.onButtonPress(props.ListItem);
        }}>
        <View style={styles.LIcontainer}>
          <Image
            source={{uri: 'https://picsum.photos/200'}}
            style={styles.LIImage}
            resizeMode="stretch"
          />
          <View style={styles.LIDesc}>
            <Text style={styles.LITitle}>{props.ListItem.itemName}</Text>

            <View style={styles.LICostContainer}>
              <View
                style={
                  props.ListItem.itemCost.daily === -1
                    ? {...styles.LICostBox, opacity: 0.4}
                    : styles.LICostBox
                }>
                <Text>
                  {props.ListItem.itemCost.daily === -1
                    ? '--'
                    : props.ListItem.itemCost.daily}
                  /day
                </Text>
              </View>
              <View
                style={
                  props.ListItem.itemCost.weekly === -1
                    ? {...styles.LICostBox, opacity: 0.4}
                    : styles.LICostBox
                }>
                <Text>
                  {props.ListItem.itemCost.weekly === -1
                    ? '--'
                    : props.ListItem.itemCost.weekly}
                  /week
                </Text>
              </View>
              <View
                style={
                  props.ListItem.itemCost.monthly === -1
                    ? {...styles.LICostBox, opacity: 0.4}
                    : styles.LICostBox
                }>
                <Text>
                  {props.ListItem.itemCost.monthly === -1
                    ? '--'
                    : props.ListItem.itemCost.monthly}
                  /month
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
