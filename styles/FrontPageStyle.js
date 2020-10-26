import {StyleSheet, Dimensions, StatusBar} from 'react-native';

let screenHeight = Dimensions.get('window').height - StatusBar.currentHeight;
let screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  category1container: {
    width: screenWidth,
    height: screenHeight * 0.05,
    backgroundColor: 'green',
  },
  category2container: {
    width: screenWidth,
    height: screenHeight * 0.05,
    backgroundColor: 'red',

  },
  category1Icon: {
    //width: screenWidth * 0.4,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'pink',
  },
  category2Icon: {
    //width: screenWidth * 0.4,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'pink',
  },
  scItemContainer:{
      height: screenHeight*0.8,
      backgroundColor: 'lightblue'
  }
});
