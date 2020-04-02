import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { OPrilogeniiScreen } from '../screens/todo/OPrilogeniiScreen';
import { THEME } from '../theme';

const OPrilStack = createStackNavigator();

export const OPrilNavigator = ({navigation, route}) => {
  let bc = '#fff';
  let tc = '#000';
  let ic = THEME.MAIN_COLOR;
  if (Platform.OS === 'android') {
    bc = THEME.MAIN_COLOR;
    tc = '#fff';
    ic = '#fff';
  }

  return(

    <OPrilStack.Navigator>
      
      <OPrilStack.Screen 
        name='OPrilogenii' 
        component={OPrilogeniiScreen} 
        initialParams={{ ...route.params }}
        options={{
          title: 'Список дел',
          headerStyle: {
            backgroundColor: bc,
          },
          headerTintColor: tc,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name='ios-menu' size={32} color={ic} style={styles.icons}/>
            </TouchableOpacity>

          ),
        }} 
      />
            
    </OPrilStack.Navigator>

  )
}

const styles = StyleSheet.create({
  icons: {
    marginLeft: 10
  },
})