import React from 'react';
import { StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const AppCheckBox = ({bool}) => {
  let el = 'ios-square-outline';
  if (bool) {
    el = 'ios-checkbox-outline';
  } 
  
  return(
    <Ionicons name={el} size={32} style={styles.icons} />

  )
}

styles = StyleSheet.create({
  icons: {
    marginLeft: 10,
  }
})