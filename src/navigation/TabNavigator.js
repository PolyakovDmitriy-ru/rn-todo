
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { THEME } from '../theme';
import { TodosNavigator } from './TodosNavigator';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'roboto-regular',
      }
    }}>
      <Tab.Screen name="TekNavigator" component={TodosNavigator} initialParams={{tekTab: 'TekNavigator'}} options={{
        tabBarLabel: 'Текущие',
        tabBarIcon: ({color, size})=>(
          <Ionicons name='ios-apps' size={size} color={color}/>
        )
      }}/>     
      <Tab.Screen name="ImportantNavigator" component={TodosNavigator} initialParams={{tekTab: 'ImportantNavigator'}} options={{
        tabBarLabel: 'Важные',
        tabBarIcon: ({color, size})=>(
          <Ionicons name='ios-star-outline' size={size} color={color}/>
        )        
      }}/>
      <Tab.Screen name="DoneNavigator" component={TodosNavigator} initialParams={{tekTab: 'DoneNavigator'}} options={{
        tabBarLabel: 'Выполненные',
        tabBarIcon: ({color, size})=>(
          <Ionicons name='md-checkmark-circle-outline' size={size} color={color}/>
        )          
      }}/>

    </Tab.Navigator>   
  )
}
