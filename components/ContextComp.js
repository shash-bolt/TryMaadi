import React, {createContext, useReducer} from 'react';
import auth from '@react-native-firebase/auth';

const initialState = {
  isLoggedIn: auth().currentUser ? true : false,
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
