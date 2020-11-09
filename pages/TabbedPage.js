import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';
import {CrossContext} from '../components/ContextComp';

import FrontPage from './FrontPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import ProfilePage from './ProfilePage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import AboutUsPage from './AboutUsPage';

export default function WelcomeComp() {
 
  const LoginStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const FrontStack = createStackNavigator();
  const CartStack = createStackNavigator();
  const AboutUsStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const [TabValue,setTabValue] = useState();

  const GlobalState = useContext(CrossContext);


  useEffect(()=>{
    showTabs()    
  },[GlobalState.state.isLoggedIn])

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
    var user = GlobalState.state.isLoggedIn;    
    if (user) {
      setTabValue (
        <Tab.Navigator>
          <Tab.Screen name="Front" component={FrontStackScreen} />          
          <Tab.Screen name="Cart" component={CartStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="AboutUs" component={AboutUsStackScreen} />
        </Tab.Navigator>
      );
    } else {
      setTabValue (
        <Tab.Navigator>
          <Tab.Screen name="Front" component={FrontStackScreen} />          
          <Tab.Screen name="Login" component={LoginStackScreen} />
          <Tab.Screen name="AboutUs" component={AboutUsStackScreen} />
        </Tab.Navigator>
      );
    }
  }
  return (
    <View style={{flex:1}}>
      {TabValue}      
    </View>
  );
}
