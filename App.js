import React from 'react';
import {View,  Text,  StatusBar,} from 'react-native';

import FrontPage from './pages/FrontPage'
import ProductPage from './pages/ProductPage'

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <FrontPage/> */}
      <ProductPage/>

    </>
  );
};

export default App;