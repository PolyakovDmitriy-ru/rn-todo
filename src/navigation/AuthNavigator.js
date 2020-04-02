import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { StartScreen } from '../screens/auth/StartScreen';
import { ZadatParolScreen } from '../screens/auth/ZadatParolScreen';

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Start' component={StartScreen} />
    <Stack.Screen name='SignIn' component={SignInScreen} />
    <Stack.Screen name='SignUp' component={SignUpScreen} />
    <Stack.Screen name='ZadatParol' component={ZadatParolScreen} />
  </Stack.Navigator>
);