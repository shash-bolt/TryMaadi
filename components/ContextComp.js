import React, {createContext, useReducer} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  isLoggedIn: auth().currentUser ? true : false,
  cartArray: new Array(), // check for user data. If none, init to new Array
  addressArray: auth().currentUser
    ? firestore().collection('UserAddresses').doc(auth().currentUser.email).get().then()   
    : null,
};

const CrossContext = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'userLoggedIn': {
      return {...state, isLoggedIn: true};
    }
    case 'userLoggedOut': {
      return {...state, isLoggedIn: false};
    }
    case 'addToCart': {
      let arr = state.cartArray;
      arr.push(action.payload.item);
      console.log(arr);
      return {...state, cartArray: arr};
    }
    case 'removeFromCart': {
      let arr = state.cartArray;
      arr.splice(action.payload.index, 1);
      console.log(arr);
      return {...state, cartArray: arr};
    }

    default:
      throw new Error('Error here..!!');
  }
}

const CrossContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CrossContext.Provider value={{state, dispatch}}>
      {children}
    </CrossContext.Provider>
  );
};

export {CrossContext, CrossContextProvider};
