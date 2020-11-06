import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';

import FrontPage from './pages/FrontPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AboutUsPage from './pages/AboutUsPage';
import AddAddressPage from './pages/AddAddressPage';

const App = () => {
  const LoginStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const FrontStack = createStackNavigator();
  const CartStack = createStackNavigator();
  const AboutUsStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function LoginStackScreen() {
    return (
      <LoginStack.Navigator headerMode={false}>
        <LoginStack.Screen name="Login" component={LoginPage} />
        <LoginStack.Screen name="SignUp" component={SignUpPage} />
      </LoginStack.Navigator>
    );
  }

  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator headerMode={false}>
        <ProfileStack.Screen name="Profile" component={ProfilePage} />
        <ProfileStack.Screen name="AddAddress" component={AddAddressPage} />
      </ProfileStack.Navigator>
    );
  }

  function FrontStackScreen() {
    return (
      <FrontStack.Navigator headerMode={false}>
        <FrontStack.Screen name="Front" component={FrontPage} />
        <FrontStack.Screen name="Product" component={ProductPage} />
      </FrontStack.Navigator>
    );
  }

  function CartStackScreen() {
    return (
      <CartStack.Navigator headerMode={false}>
        <CartStack.Screen name="Cart" component={CartPage} />
      </CartStack.Navigator>
    );
  }

  function AboutUsStackScreen() {
    return (
      <AboutUsStack.Navigator headerMode={false}>
        <AboutUsStack.Screen name="AboutUs" component={AboutUsPage} />
      </AboutUsStack.Navigator>
    );
  }

  function showTabs() {
    var user = auth().currentUser;
    if (user) {
      return (
        <Tab.Navigator>
          <Tab.Screen name="Front" component={FrontStackScreen} />          
          <Tab.Screen name="Cart" component={CartStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="AboutUs" component={AboutUsStackScreen} />
        </Tab.Navigator>
      );
    } else {
      return (
        <Tab.Navigator>
          <Tab.Screen name="Front" component={FrontStackScreen} />          
          <Tab.Screen name="Login" component={LoginStackScreen} />
          <Tab.Screen name="AboutUs" component={AboutUsStackScreen} />
        </Tab.Navigator>
      );
    }
  }

  return (
    <>
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
        {showTabs()}
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
