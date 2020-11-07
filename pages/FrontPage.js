import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, TextInput, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from '../styles/FrontPageStyle';

import ListItemComp from '../components/ListItemComp';

export default function FrontPageFn() {
  const [products, setProducts] = useState();
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');

  useEffect(() => {
    setProducts(updateProducts());    
  }, []);

  const currProd = require('../assets/products.json');

  function updateProducts() {
    //get data from firebase
    const currProd = require('../assets/products.json');
    return currProd;
  }

  function cat1map(arr) {
    if (arr == undefined) return null;
    console.log('cat1map');
    return (
      arr.products &&
      arr.products.map((val, index) => {
        return val.category;
      })
    );
  }

  function cat2map(cat) {
    if (cat == undefined) return null;
    if (products == undefined) return null;
    console.log('cat2map: ' + cat);

    let index = products.products.findIndex((val) => {
      //console.log(val.category)
      return val.category === cat;
    });
    console.log('index:' + index + '----------------------------');
    if (index > -1) {
      return products.products[index].subcategory.map((val) => {
        return val.scName;
      });
    }
  }

  function RenderCat1Icons(pty) {
    return (
      <TouchableOpacity
        style={styles.category1Icon}
        onPress={() => {
          setCategory1(pty.value);
          //console.log(pty.value)
        }}>
        <Text>{pty.value} .....</Text>
      </TouchableOpacity>
    );
  }

  function RenderCat2Icons(pty) {
    return (
      <TouchableOpacity
        style={styles.category2Icon}
        onPress={() => {
          setCategory2(pty.value);
          //console.log(pty.value)
        }}>
        <Text>{pty.value} .....</Text>
      </TouchableOpacity>
    );
  }

  function scItemMap(cat2) {
    if (cat2 == undefined) return null;
    if (products == undefined) return null;

    let index = products.products.findIndex((val) => {
      return val.category === category1;
    });
    let index2 = -1;
    if (index > -1) {
      index2 = currProd.products[index].subcategory.findIndex((val) => {
        return val.scName === category2;
      });
    }
    if (index2 > -1) {
      return currProd.products[index].subcategory[index2].scItems;
    }
  }

  function handleModal(item) {
    console.log('Button pressed');
    console.log(JSON.stringify(item));    
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.category1container}>
        {products && (
          <FlatList
            data={cat1map(products)}
            renderItem={({item}) => <RenderCat1Icons value={item} />}
            keyExtractor={(item, index) => index.toString() + item.toString()}
            horizontal={true}
            scrollEnabled={true}
          />
        )}
      </View>
      <View style={styles.category2container}>
        {products && (
          <FlatList
            data={cat2map(category1)}
            renderItem={({item}) => <RenderCat2Icons value={item} />}
            keyExtractor={(item, index) => index.toString() + item.toString()}
            horizontal={true}
            scrollEnabled={true}
          />
        )}
      </View>
      <View style={styles.scItemContainer}>
        {products && (
          <FlatList
            data={scItemMap(category2)}
            renderItem={({item}) => (
                <ListItemComp
                ListItem={item}               
                onButtonPress={(item) => handleModal(item)}
              />
            )}
            keyExtractor={(item, index) => index.toString() + item.toString()}
            scrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
}
