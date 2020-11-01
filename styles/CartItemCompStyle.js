import {StyleSheet, Dimensions, StatusBar} from 'react-native';

let screenHeight = Dimensions.get('window').height - StatusBar.currentHeight;
let screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: screenWidth*0.95,    
  },
  LIcontainer:{
    width: screenWidth*0.95,
      height: screenHeight*0.2,
      backgroundColor: 'lightblue',
      marginVertical: 3,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: 'black'
  },
  LIImage:{
      width: '30%',
      padding: 5,

  },
  LIDesc:{
      width:'70%',
      padding: 5
  },
  LITitle:{
      fontSize: 18,
      fontWeight: "bold",   
  },
  LIText:{
      fontSize: 15
  },  
  cartOptionBox:{
      width: '33.3333%',
      height: '100%',
      borderColor: 'black',
      borderWidth: 1,     
      backgroundColor: 'orange',
      alignItems: "center",
      justifyContent:"center"
  },
  timerOptionBox:{
    width: '33.3333%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,     
    backgroundColor: 'orange',
    alignItems: "center",
    justifyContent:"center",
    flexDirection: "row"
},
  optionContainer:{
    width: '100%',
    height: '25%',
    backgroundColor: 'white',
    flexDirection: "row"
  }
});
