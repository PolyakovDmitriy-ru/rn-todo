import React, {useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { THEME } from '../theme';
import { TabNavigator } from './TabNavigator';
import { OPrilNavigator } from './OPrilNavigator'

const Drawer = createDrawerNavigator();

function LogOut({navigation}) {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(logout());
    navigation.navigate('Start');
  })

  return null
}

export const DrawerNavigator = ({route}) => {
  return (
    <Drawer.Navigator drawerContentOptions={{
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'roboto-bold',
      }
    }}>
    <Drawer.Screen name='TabNavigator' component={TabNavigator} initialParams={{ ...route.params }} options={{drawerLabel: 'Список дел'}}/>
    <Drawer.Screen name="OPrilNavigator" component={OPrilNavigator} options={{drawerLabel: 'О приложении'}} />
    <Drawer.Screen name='LogOut' component={LogOut} options={{drawerLabel: 'Выйти'}}/>
    

  </Drawer.Navigator>     
  )
}