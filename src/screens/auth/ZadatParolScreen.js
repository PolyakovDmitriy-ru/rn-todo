import React, {useState, useEffect} from 'react';
import { Animated, TouchableOpacity, TextInput, StyleSheet, Text, Keyboard, SafeAreaView, View, TouchableWithoutFeedback} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../../components/AppText';
import { AppButton1 } from '../../components/AppButton1';
import { THEME } from '../../theme';
import * as types from '../../constants/auth';
import { zadatParol } from '../../actions/auth';

export const ZadatParolScreen = ({navigation, route}) => {
  const [kod, setKod] = useState('');
  const [pass, setPass] = useState('');  
  const [repeatPass, setRepeatPass] = useState('');
  const [passView, setPassView] = useState(true);
  const [repeatPassView, setRepeatPassView] = useState(true);
  const [loading, setLoading] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const services = useSelector(state => state.services);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


  useEffect(()=>{
    if (services.isFetching.zadatParol) {
      setLoading(
        <View>
          <ActivityIndicator color='#fff' />
        </View>
      )
    } else {
      setLoading(null);
    }
  }, [services.isFetching.signUp])

  useEffect(()=> {
    if (services.message.openMsg) {
      dispatch({
        type: types.CLOSE_MSG
      })
        Animated.sequence([
          Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1000,
            }
          ),
          Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 8000
            }
          )
        ]).start();

    }
  }, [services.message])  

  const onPressPassView = () => {
    setPassView(prevState => {
      return !prevState
    });
  }

  const onPressRepeatPassView = () => {
    setRepeatPassView(prevState => {
      return !prevState
    });
  }

  const onPressZadatParol = () =>{
    if (pass != repeatPass) {
      dispatch({
        type: types.NEW_ERROR,
        payload: {
          message: 'Пароль и повторение пароля не совпадают!',
        }
      })
    } else if (pass.length < 6) {
      dispatch({
        type: types.NEW_ERROR,
        payload: {
          message: 'Пароль должен быть от 6 до 20 символов!',
        }
      })
    } else if (pass.length > 20) {
      dispatch({
        type: types.NEW_ERROR,
        payload: {
          message: 'Пароль должен быть от 6 до 20 символов!',
        }
      })
    } else if (kod.length < 1) {
      dispatch({
        type: types.NEW_ERROR,
        payload: {
          message: 'Код из почты не заполнен!',
        }
      })
    } else {
      dispatch(zadatParol(route.params.email, pass, kod));
    }

  }

  if (isAuthenticated) {
    navigation.navigate('DrawerNavigator');
    return null;
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>     
      <View style={styles.wrapper}>
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
            }}
        />
        <SafeAreaView style={styles.saveArea}>
          <View style={styles.logo}>
            <Text style={styles.textLogo}>ДП</Text>
          </View>
          <AppText style={styles.textName}>Мои Делишки</AppText>


          <View style={styles.borderInput}>
            <View style={styles.captionGroup}>
              <View style={styles.caption1}></View>
              <View style={styles.captionText}>       
                <Text style={styles.captionInput}>Код из почты</Text>       
              </View>
              <View style={styles.caption}></View>
            </View>
            
            <View style={styles.inputView}>     
              <Ionicons name='ios-key' size={20} color='#fff' style={styles.icons}/>
              <TextInput 
                style={styles.input} 
                value={kod}
                onChangeText={setKod}
                placeholder='Введите код из email'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='numeric'
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
              />
            </View>
          </View>

          <View style={styles.borderInput}>
            <View style={styles.captionGroup}>
              <View style={styles.caption1}></View>
              <View style={styles.captionText}>       
                <Text style={styles.captionInput}>Задайте пароль</Text>       
              </View>
              <View style={styles.caption}></View>
            </View>
            <View style={styles.inputView}>     
              <Ionicons name='ios-key' size={20} color='#fff' style={styles.icons}/>
              <TextInput 
                style={styles.input} 
                value={pass}
                onChangeText={setPass}
                placeholder='Введите пароль'
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='password'
                secureTextEntry={passView}
                textContentType='password'
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
              />
              <TouchableOpacity onPress={onPressPassView}>
                {passView ? (
                  <Ionicons name='ios-eye-off' size={20} color='#fff' style={styles.icons}/>
                ) : (
                  <Ionicons name='ios-eye' size={20} color='#fff' style={styles.icons}/>
                )}
                
              
              </TouchableOpacity>
            </View>        
          </View>

          <View style={styles.borderInput}>
            <View style={styles.captionGroup}>
              <View style={styles.caption1}></View>
              <View style={styles.captionText}>       
                <Text style={styles.captionInput}>Повторите пароль</Text>       
              </View>
              <View style={styles.caption}></View>
            </View>
            <View style={styles.inputView}>     
              <Ionicons name='ios-key' size={20} color='#fff' style={styles.icons}/>
              <TextInput 
                style={styles.input} 
                value={repeatPass}
                onChangeText={setRepeatPass}
                placeholder='Повторите пароль'
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='password'
                secureTextEntry={repeatPassView}
                textContentType='password'
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
              />
              <TouchableOpacity onPress={onPressRepeatPassView}>
                {repeatPassView ? (
                  <Ionicons name='ios-eye-off' size={20} color='#fff' style={styles.icons}/>
                ) : (
                  <Ionicons name='ios-eye' size={20} color='#fff' style={styles.icons}/>
                )}
                
              
              </TouchableOpacity>
            </View>        
          </View>

          <Animated.View style={{opacity: fadeAnim}}>
            <AppText style={styles.textError}>Ошибка: {services.message.msg}</AppText>
          </Animated.View>

          <AppButton1 onPress={onPressZadatParol}>Задать пароль</AppButton1>

          {loading}
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.MAIN_COLOR,
  },  
  saveArea: {
    alignItems: "center",
  },
  logo: {
    borderWidth: 3,
    width: 50,
    height: 50,
    borderColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    opacity: 0.85,
  },
  textLogo: {
    fontFamily: 'napoleon',
    color: '#fff',
    fontSize: 20,
  },
  textName: {
    color: '#fff',
    fontSize: 25,   
    marginBottom: 40, 
    opacity: 0.85,
  },   
  borderInput: {
    width: '80%',
    borderStartWidth: 4,
    borderEndWidth: 4,
    borderBottomWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    opacity: 0.85,
  },
  captionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: -9,
    left: 4,
    width: '60%',
    marginRight: 8,

  },
  caption1: {
    width: '9%',
    marginRight: 10,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.5,

  },
  captionText: {
    flexDirection: 'row',
  },
  captionInput: {
    color: '#fff',
    width: 130,
  },
  caption: {
    width: '100%',
    marginLeft: 10,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  inputView: {
    flexDirection: 'row',   
    marginLeft: 10,
    marginRight: -20,
    top: -8
  },
  icons: {
    marginTop: 3,
  },
  input: {
    width: '70%',
    marginLeft: 10,
    marginRight: 10,
    color: '#fff',
  },  
  textError: {
    color: THEME.RED_COLOR,
  }  
})