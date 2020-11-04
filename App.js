import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FrontPage from './pages/FrontPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AboutUsPage from './pages/AboutUsPage';
import AddAddressPage from './pages/AddAddressPage';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Product" component={ProductPage} />
          <Stack.Screen name="Front" component={FrontPage} />
          <Stack.Screen name="AboutUs" component={AboutUsPage} />
          <Stack.Screen name="AddAddress" component={AddAddressPage} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <FrontPage/> */}
      {/* <ProductPage/> */}
      {/* <CartPage/> */}
      {/* <ProfilePage/> */}
      {/* <SignUpPage/> */}
      {/* <LoginPage/> */}
    </>
  );
};

export default App;
