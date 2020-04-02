import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, TouchableOpacity,SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { getTabl, deleteElement, zapisatElement } from '../../actions/dashboard';
import { getNotivications } from '../../actions/auth';
import { formatData1 } from '../../utils/format-data';
import { THEME } from '../../theme';
import { AppButtonIcon } from '../../components/AppButtonIcon';
import { AppText } from '../../components/AppText';


function Item({ item, onPressDelete, onPressEdit, onPressVazn, onPressVipolnena }) {
  let tekDate = new Date();
  tekDate.setHours(0, 0, 0, 0);
  let zavtraDate = new Date();
  zavtraDate.setHours(0, 0, 0, 0);
  zavtraDate.setDate(zavtraDate.getDate() + 1);

  let dataDate = new Date(item.dataUtc0);
  let dataStr = formatData1(dataDate);
  let star = 'ios-star-outline';
  if (item.vazn) {
    star = 'ios-star';
  } 
  
  let vipol ='md-checkmark-circle-outline';
  if (item.vipolnena) {
    vipol = 'ios-square-outline';
  }

  let color = '#000';
  if (item.vazn) {
    color = THEME.YELLOW_COLOR;
  } else if (item.vipolnena) {
    color = THEME.GREEN_COLOR;
  } else if (dataDate < tekDate) {
    color = THEME.RED_COLOR;
  } else if (dataDate < zavtraDate) {
    color = THEME.BLUE_COLOR;
  }

  

  return (
    <View style={{...styles.card, borderLeftColor: color}}>
      <TouchableOpacity onPress={()=>onPressEdit(item._id)}>
        <View style={styles.cardHorizont}>
          <View style={styles.item}>
            <Text style={styles.data}> 🗓️{dataStr.slice(0, 10)}⌚{dataStr.slice(11)}</Text>
            <Text style={styles.title}>{item.name}</Text>
          </View> 
          <Ionicons name='ios-arrow-forward' size={24} color={THEME.GREY_COLOR}/>
          

        </View>
      </TouchableOpacity>

      <View style={styles.razd}></View>
      <View style={styles.groupButton}>
        <AppButtonIcon name={vipol} color={THEME.GREEN_COLOR} onPress={()=>onPressVipolnena(item)}/>
        <AppButtonIcon name='ios-trash' color={THEME.RED_COLOR} onPress={()=>onPressDelete(item._id)}/>
        <AppButtonIcon name='md-create' color={THEME.GREEN_COLOR} onPress={()=>onPressEdit(item._id)}/>
        <AppButtonIcon name={star} color={THEME.YELLOW_COLOR} onPress={()=>onPressVazn(item)}/>
        
      </View>
      

    </View>
  );
}

export const TodosScreen = ({ navigation, route}) => {
  const [isFetching, setIsFetcing] = useState(false);
  const [isFetching1, setIsFetcing1] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);
  const services = useSelector(state => state.services);
  useEffect(()=>{
    if (!services.isFetching.getTabl.zadaci && isFetching) {
      setIsFetcing1(true);
    }
  }, [services.isFetching.getTabl.zadaci, isFetching])
  useEffect(()=>{
    dispatch(getTabl('zadaci'));
    setIsFetcing(true);
  }, [getTabl])
  useEffect(()=>{
    if (auth.isAuthenticated && !auth.getNotivication) {
      dispatch(getNotivications());
    }
  }, [auth, getNotivications])
  const dashboard = useSelector(state => state.dashboard);

  if (!dashboard.tabl.tabl) {
    return (
      <ActivityIndicator color={THEME.MAIN_COLOR} />
    )
  }
  if (!isFetching) {
    return (
      <ActivityIndicator color={THEME.MAIN_COLOR} />
    )    
  }
  if (!isFetching1) {
    return (
      <ActivityIndicator color={THEME.MAIN_COLOR} />
    )     
  }


  let zadaci = [];

  if (route.params.tekTab === 'DoneNavigator') {
    zadaci = dashboard.tabl.tabl.zadaci.data.filter((el)=>{return el.vipolnena})
 
  } else if (route.params.tekTab === 'ImportantNavigator') {
    zadaci = dashboard.tabl.tabl.zadaci.data.filter((el)=>{return !el.vipolnena && el.vazn})    
  } else {
    zadaci = dashboard.tabl.tabl.zadaci.data.filter((el)=>{return !el.vipolnena})    
  }

  let el = null;
  if (zadaci.length === 0) {
    if (route.params.tekTab === 'ImportantNavigator') {
      el = 
        <View style={styles.wrapper}>
          <AppText style={styles.textPusto}>Нет важных задач</AppText>
        </View>
    } else if (route.params.tekTab === 'DoneNavigator') {
      el = 
        <View style={styles.wrapper}>
          <AppText style={styles.textPusto}>Нет выполненных задач</AppText>
        </View>
    } else {
      el = 
        <View style={styles.wrapper}>
          <AppText style={styles.textPusto}>Нет текущих задач</AppText>
        </View>      
    }
  }

  const onPressDelete = (id) =>{
    
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
          }
        },          
        {
          text: 'Нет',
        },
      ],
      {cancelable: false},
    ); 

  }

  const onPressEdit = (id) => {
    
    navigation.push('DrawerItemNavigator', {
      itemId: {id}, 
    });
  }

  const onPressVazn = (item) => {
    const data = {...item};
    data.vazn = !data.vazn;

    dispatch(zapisatElement('zadaci', data));
  }

  const onPressVipolnena = (item) => {
    const data = {...item};
    data.vipolnena = !data.vipolnena;

    dispatch(zapisatElement('zadaci', data));
  }

  return (
    <SafeAreaView style={styles.container}>
      {el}
      <FlatList
        data={zadaci}
        renderItem={({ item }) => <Item item={item} onPressDelete={onPressDelete} onPressEdit={onPressEdit} onPressVazn={onPressVazn} onPressVipolnena={onPressVipolnena}/>}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 3,
    marginHorizontal: 8,
    borderLeftWidth: 3,
  },
  data: {
    fontFamily: 'roboto-bold',
    marginBottom: 5,
  },
  item: {
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 8,
  },
  title: {
    fontFamily: 'roboto-regular'
  },
  cardHorizont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginEnd: 10,
  },
  razd: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
    marginLeft: 15,
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginVertical: 10,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPusto: {
    color: THEME.MAIN_COLOR,
    fontSize: 20,
  }
});