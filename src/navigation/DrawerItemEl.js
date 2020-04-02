import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export const DrawerItemEl = (props, onPressDel) => {
 
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Удалить"
        onPress={() => {
          onPressDel()
        }}
      />

    </DrawerContentScrollView>
  );    
  
}