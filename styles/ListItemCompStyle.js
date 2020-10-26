import {StyleSheet, Dimensions, StatusBar} from 'react-native';

let screenHeight = Dimensions.get('window').height - StatusBar.currentHeight;
let screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  LIcontainer:{
      width: screenWidth*0.95,
      height: screenHeight*0.2,
      backgroundColor: 'yellow',
      marginVertical: 10,
      flexDirection: "row"
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
      fontSize: 20,
      fontWeight: "bold",      
  },
  LICostContainer:{
      width: '100%',
      height: '25%',
      backgroundColor: 'white',
      flexDirection: "row"
  },
  LICostBox:{
      width: '33.3333%',
      height: '100%',
      borderColor: 'black',
      borderWidth: 2,     
      backgroundColor: 'orange',
      alignItems: "center",
      justifyContent:"center"
  }
});
