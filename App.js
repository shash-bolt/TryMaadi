import React from 'react';
import {View,  Text,  StatusBar,} from 'react-native';

import FrontPage from './pages/FrontPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <FrontPage/> */}
      {/* <ProductPage/> */}
      <CartPage/>

    </>
  );
};

export default App;