import React, { useEffect, useState, useContext } from 'react';
import {View, Text, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { CrossContextProvider} from './components/ContextComp'

import TabbedPage from './pages/TabbedPage';

const App = () => {
  return (
    <>
    <CrossContextProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Login"> */}
        {/* <Stack.Screen name="Login" component={LoginPage} /> */}
        {/* <Stack.Screen name="SignUp" component={SignUpPage} /> */}
        {/* <Stack.Screen name="Profile" component={ProfilePage} /> */}
        {/* <Stack.Screen name="Cart" component={CartPage} /> */}
        {/* <Stack.Screen name="Product" component={ProductPage} /> */}
        {/* <Stack.Screen name="Front" component={FrontPage} /> */}
        {/* <Stack.Screen name="AboutUs" component={AboutUsPage} /> */}
        {/* <Stack.Screen name="AddAddress" component={AddAddressPage} /> */}
        {/* </Stack.Navigator> */}
        {/* <Tab.Navigator>
          <Tab.Screen name="Front" component={FrontStackScreen} />
          <Tab.Screen name="AboutUs" component={AboutUsStackScreen} />
          <Tab.Screen name="Cart" component={CartStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="Login" component={LoginStackScreen} />
        </Tab.Navigator> */}
        <TabbedPage/>
      </NavigationContainer>

      {/* <FrontPage/> */}
      {/* <ProductPage/> */}
      {/* <CartPage/> */}
      {/* <ProfilePage/> */}
      {/* <SignUpPage/> */}
      {/* <LoginPage/> */}
      </CrossContextProvider>
    </>
  );
};

export default App;
