import {StyleSheet, Dimensions, StatusBar} from 'react-native';

let screenHeight = Dimensions.get('window').height - StatusBar.currentHeight;
let screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,  
  },
  CalenderContainer:{
    height: screenHeight*0.5,
    backgroundColor: 'green'
  },
  ProductContainer:{
    height: screenHeight*0.8,
    backgroundColor: 'yellow',
    alignItems: "center"
  },
  CartItemContainer:{
    width: screenWidth*0.95,
    backgroundColor: 'white',
    height: screenHeight*0.25,
    marginVertical: 5,
  },
  CartItemTitle:{
    fontSize: 18,
      fontWeight: "bold",   
  },
  BottomContainer:{    
    height: screenHeight*0.1,
    backgroundColor: 'green',
  },
  ProductImage:{
    height: screenHeight*0.3,
    margin: 10
  },
  ProductTitle:{
    fontSize: 23,
    fontWeight: "bold",    
    margin: 10
  },
  ProductDesc:{
    fontSize: 17,    
    margin: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    fontFamily: 'sans-serif-light',
    textAlign: "justify"
   
  },
  InfoDateSet:{
    fontSize: 18,   
    marginHorizontal: 10, 
  },
  DatesSetStyle:{
    fontSize: 17,    
    margin: 10,    
    fontFamily: 'sans-serif-light',
    textAlign: "justify"   
  },
  AddCartContainer:{
    height: screenHeight*0.1,
    backgroundColor: 'white',
    alignItems:"center",
    
  },
  buttonContainer: {
    padding: 10,
    margin: 15,
    width: screenWidth * 0.8,
    alignItems: 'center',
    backgroundColor: '#9d05f5',   
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonContainerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'sans-serif',
  },
});
