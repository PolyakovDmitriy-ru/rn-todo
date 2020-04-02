import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { deleteElement } from '../actions/dashboard';
import { THEME } from '../theme';
import { ItemNavigator } from './ItemNavigator';
import { DrawerItemEl } from './DrawerItemEl';

const Drawer = createDrawerNavigator();

export const DrawerItemNavigator = ({route, navigation}) => {
  const dispatch = useDispatch();

  const onPressDel = () => {
    let id = null;
    if (route.params) {
      if (route.params.itemId) {
        id = route.params.itemId.id;
      }
    }
    if (id) {
      let data = {
        cellData: id,
      }

      Alert.alert(
        'Удалить задачу?',
        '',
        [
          {
            text: 'Да', 
            onPress: () => {
              dispatch(deleteElement('zadaci', data));
              navigation.navigate('TabNavigator');
            }
          },          
          {
            text: 'Нет',
            onPress: () => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }
          },
        ],
        {cancelable: false},
      );        
    } else {
      navigation.navigate('TabNavigator');      
    }

  } 

  return (
    <Drawer.Navigator 
      drawerContent= {(props)=>DrawerItemEl(props, onPressDel)}
      drawerPosition='right'
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
          fontFamily: 'roboto-bold',
        },
    }}>
      <Drawer.Screen name="ItemNavigator" initialParams={{ ...route.params }} component={ItemNavigator} options={{drawerLabel: 'Задача'}}/>
    </Drawer.Navigator>      
  )
}
