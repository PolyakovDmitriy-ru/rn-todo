import React from 'react';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { TodosScreen } from '../screens/todo/TodosScreen';
import { THEME } from '../theme';
import { getTabl } from '../actions/dashboard';

const TodosStack = createStackNavigator();

export const TodosNavigator = ({navigation, route}) => {
  const dispatch = useDispatch();
  let bc = '#fff';
  let tc = '#000';
  let ic = THEME.MAIN_COLOR;
  let icz = THEME.GREEN_COLOR;
  if (Platform.OS === 'android') {
    bc = THEME.MAIN_COLOR;
    tc = '#fff';
    ic = '#fff';
    icz = THEME.GREEN_COLOR_LIGHT;
  }

  return(

    <TodosStack.Navigator>
      
      <TodosStack.Screen 
        name='Todos' 
        component={TodosScreen} 
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
          headerRight: () => (
            <View style={styles.groupButton}>
              <TouchableOpacity onPress={() => dispatch(getTabl('zadaci'))}>
                <Ionicons name='md-refresh' size={32} color={icz} style={styles.icons1}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push('DrawerItemNavigator')}>
                <Ionicons name='ios-add-circle-outline' size={32} color={ic} style={styles.icons1}/>
              </TouchableOpacity>
            </View>            
          )
        }} 
      />
            
    </TodosStack.Navigator>

  )
}

const styles = StyleSheet.create({
  icons: {
    marginLeft: 10
  },
  icons1: {
    marginRight: 10
  },
  groupButton: {
    flexDirection: 'row'
  }
})