import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppText } from './AppText';
import { AppTextBold } from './AppTextBold';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatData1 } from '../utils/format-data';
import { AppCheckBox } from './AppCheckBox';

export const AppItem = ({ item, setData }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date')

  let offset = new Date().getTimezoneOffset();
  offset = offset* (-1);

  const onPressIcon = () => {
    if (item.value) {
      setData(false, item);
    } else {
      setData(true, item);
    }
  }

  const onChange = (event, selectedDate) => {

    const currentDate = selectedDate || item.value;

    setShow(Platform.OS === 'ios');

    if (Platform.OS==='android') {
      if (mode==='time') {
        const dataA = new Date(item.value);
        dataA.setHours(currentDate.getHours(), currentDate.getMinutes());
        setData(dataA, item);
      } else {
        const dataB = new Date(currentDate);
        dataB.setHours(item.value.getHours(), item.value.getMinutes());
        setData(dataB, item);        
      }

    } else {
      setData(currentDate, item);
    }

  }; 

  const onPressDate = () => {
    setShow((prevState)=>{
      if (!prevState) {
        return true
      } else {
        if (mode==='date') {
          return false
        } else {
          return true
        }
      }
    })
    setMode('date');
  }

  const onPressTime = () => {
    setShow((prevState)=>{
      if (!prevState) {
        return true
      } else {
        if (mode==='time') {
          return false
        } else {
          return true
        }
      }
    })    
    setMode('time');
  }

  if (item.type==='data') {

    const dataStr = formatData1(item.value);

    return (
      <View style={styles.container}>
        <AppText>{item.label}:</AppText>
        <View style={styles.date}>
          <TouchableOpacity onPress={onPressDate}>
            <AppTextBold>{dataStr.slice(0, 10)} 🗓️</AppTextBold>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressTime}>
            <AppTextBold> {dataStr.slice(11)} ⌚</AppTextBold>
          </TouchableOpacity>       
        </View>
        {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={offset}
              value={item.value}
              locale="ru-RU"
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
        )} 
      </View>
      
    )
  } else if (item.type==='stroka') {
    return (
      <View style={styles.container}>
        <AppText>{item.label}:</AppText>

        <View style={styles.input}>
          <TextInput
            value={item.value}
            onChangeText={text => setData(text, item)}
            placeholder="Введите название задачи"
            multiline
          />
        </View>
      </View>
    )
  } else if (item.type==='bool') {

    let icon = null;
    if (item.dataKey==='vazn') {
      if (item.value) {
        icon = <Ionicons name='ios-star' size={32} color={THEME.YELLOW_COLOR} style={styles.icons}/>;
      } else {
        icon = <Ionicons name='ios-star-outline' size={32} color={THEME.YELLOW_COLOR} style={styles.icons}/>;
      }
    } else {
      icon = <AppCheckBox bool = {item.value}/>
    }
    
    return (
      <View style={styles.container}>
        <AppText>{item.label}:</AppText>
        <TouchableOpacity onPress={onPressIcon}>
          {icon}
        </TouchableOpacity>   
      </View>      
    )

  } else {
    return null
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
    marginBottom: 10,
    marginLeft: 10,
  },  
  date: {
    flexDirection: 'row',
    marginLeft: 10
  },
  container: {
    marginBottom: 10,
  },
  icons: {
    marginLeft: 10,
  }
})