
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthNavigator } from './AuthNavigator';
import { DrawerItemNavigator } from './DrawerItemNavigator';
import { DrawerNavigator } from './DrawerNavigator';


const Stack = createStackNavigator();

export const AppNavigator = () => {

  return(
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Auth' component={AuthNavigator} />
        <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
        <Stack.Screen name='DrawerItemNavigator' component={DrawerItemNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
