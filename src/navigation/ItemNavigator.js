import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TodoItemScreen } from '../screens/todo/TodoItemScreen';
import { THEME } from '../theme';


const Stack = createStackNavigator();

export const ItemNavigator = ({ route }) => {
  let bc = '#fff';
  let tc = '#000';
  if (Platform.OS === 'android') {
    bc = THEME.MAIN_COLOR;
    tc = '#fff';
  }
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TodoItem" 
        component={TodoItemScreen} 
        initialParams={{ ...route.params }}
        options={{
          headerStyle: {
            backgroundColor: bc,
          },
          headerTintColor: tc,
        }}
      />      
    </Stack.Navigator>    
  )
}
