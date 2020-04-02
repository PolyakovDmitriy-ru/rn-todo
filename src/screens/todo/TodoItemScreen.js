import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, Alert, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, View, FlatList, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { zapisatElement } from '../../actions/dashboard';
import { THEME } from '../../theme';
import {AppItem} from '../../components/AppItem';

export const TodoItemScreen = ({ route, navigation }) =>{

  let ic = THEME.MAIN_COLOR;
  let icz = THEME.GREEN_COLOR;
  if (Platform.OS === 'android') {
    ic = '#fff';
    icz = THEME.GREEN_COLOR_LIGHT;
  }


  const dispatch = useDispatch();
  let { itemId } = route.params;
  if (itemId) {
    itemId = itemId.id;
  }
  const dashboard = useSelector(state => state.dashboard);

  if (!dashboard.tabl.tabl) {
    return (
      <ActivityIndicator color={THEME.MAIN_COLOR} />
    )
  }

  const kolonki = useSelector(state => state.dashboard.tabl.tabl.zadaci.kolonki);

  const masValue = dashboard.tabl.tabl.zadaci.data.filter(x => x._id === itemId);


  const dataKolonki = [...kolonki];
  dataKolonki.forEach(el => {
    if (el.type === 'data') {
      if (itemId && masValue.length > 0) {
        const date = new Date(masValue[0][el.dataKey]);
        el.value = date;
      } else {
        const dateTek = new Date();
        el.value = dateTek
      }
    } else if (el.type === 'bool') {
      if (itemId && masValue.length > 0) {
        el.value = masValue[0][el.dataKey];      
      } else {
        el.value = false;
      }
    } else {
      if (itemId && masValue.length > 0) {
        el.value = masValue[0][el.dataKey];      
      } else {
        el.value = '';
      }
    }
  })

  const [data, setData] = useState(dataKolonki);
  const [izm, setIzm] = useState(false);

  const setDataEl = (text, item) => {
    setData((prevData)=>{

      const ind = prevData.indexOf(item);
      
      if (ind>= 0) {
        const newItem = {...prevData[ind]}
        newItem.value = text;
        const newData1 = [...prevData.slice(0, ind), newItem, ...prevData.slice(ind+1)]
        setIzm(true);
        return newData1;
      } else {
        return prevData;
      }

    })
  }

  const onPressDone = () => {
    const dataObj = {};
    data.forEach(el=>{
      dataObj[el.dataKey] = el.value;
    })
    dataObj._id = itemId;

    dispatch(zapisatElement('zadaci', dataObj));
    navigation.goBack();
  }

  let title = 'Задача';
  if (!itemId) {
    title = title + ' (новая)';
  }
  if (izm) {
    title = title + ' *';
  }

  navigation.setOptions({
    title: title,
    headerLeft: () => (
      <TouchableOpacity onPress={()=> {
        if (izm) {
          Alert.alert(
            'Задача не сохранена!',
            'Сохранить задачу?',
            [
              {
                text: 'Да', 
                onPress: () => {
                  onPressDone();
                }
              },          
              {
                text: 'Нет',
                onPress: () => {
                  navigation.goBack();
                }
              },
              {
                text: 'Отмена',
              }
            ],
            {cancelable: false},
          );   
        } else {
          navigation.goBack();
        }      
      }}>
        <Ionicons name='ios-arrow-back' size={32} color={ic} style={styles.icons}/>
      </TouchableOpacity>
    ),    
    headerRight: () => (
      <View style={styles.viewIcons}>
        <TouchableOpacity onPress={()=> {
          navigation.toggleDrawer();
        }}>
          <Ionicons name='ios-more' size={32} color={ic} style={styles.icons}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onPressDone()}>
          <Ionicons name='md-done-all' size={32} color={icz} style={styles.icons}/>
        </TouchableOpacity>
      </View>
    ),
  })

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (           
              <AppItem item={item} setData={setDataEl}/>
            )
          }}
          keyExtractor={item => item.dataKey}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    height: '95%'
  },
  viewIcons: {
    flexDirection: 'row',
    marginRight: 10
  },
  icons: {
    marginLeft: 10
  },
})