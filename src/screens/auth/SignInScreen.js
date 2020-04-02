import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Animated, SafeAreaView, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';
import { AppButton1 } from '../../components/AppButton1';
import { AppText } from '../../components/AppText';
import { login } from '../../actions/auth';
import * as types from '../../constants/auth';

export const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(null);
  const [pass, setPass] = useState('');
  const [passView, setPassView] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const services = useSelector(state => state.services);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [editable, setEditable] = React.useState(false)

  //боремся с глюком на xiaomi
  useEffect(() => {
    setTimeout(() => {
      setEditable(true)
    }, 100)
  }, [])

  useEffect(()=>{
    if (services.isFetching.login) {
      setLoading(
        <View>
          <ActivityIndicator color='#fff' />
        </View>
      )
    } else {
      setLoading(null);
    }
  }, [services.isFetching.login])

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

  const onPressLogin = () =>{

    dispatch(login(email, pass));
  }

  if (isAuthenticated) {
    navigation.navigate('DrawerNavigator');
    return null;
  }

  return (
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
          <AppText style={styles.textNameScreen}>Вход</AppText>
          <View style={styles.borderInput}>
            <View style={styles.captionGroup}>
              <View style={styles.caption1}></View>
              <View style={styles.captionText}>       
                <Text style={styles.captionInput}>Email</Text>       
              </View>
              <View style={styles.caption}></View>
            </View>
            
            <View style={styles.inputView}>     
              <Ionicons name='ios-mail' size={20} color='#fff' style={styles.icons}/>
              <TextInput 
                style={styles.input} 
                value={email}
                onChangeText={setEmail}
                editable={editable}
                placeholder='Введите Email'
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
              />
            </View>
          </View>
          <View style={styles.borderInput}>
            <View style={styles.captionGroup}>
              <View style={styles.caption1}></View>
              <View style={styles.captionText}>       
                <Text style={styles.captionInput}>Пароль</Text>       
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

          <View style={styles.groupButton}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp', {textButton: 'Зарегистрироваться'})}>
              <AppText style={styles.text}>Регистрация</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp', {textButton: 'Восстановить пароль'})}>
              <AppText style={styles.text}>Забыли пароль?</AppText>
            </TouchableOpacity>
          </View>

          <Animated.View style={{opacity: fadeAnim}}>
            <AppText style={styles.textError}>Ошибка: {services.message.msg}</AppText>
          </Animated.View>

          <AppButton1 onPress={onPressLogin}>Войти</AppButton1>

          {loading}
        </SafeAreaView>
      </View>  
    </TouchableWithoutFeedback>
  )
}

SignInScreen.navigationOptions = () => ({
  headerTitle: 'Мои Задачи',
})

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#fff',
  },
  groupButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 15,
    opacity: 0.7,
  },

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
    marginBottom: 10,
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
    fontSize: 16,   
    marginBottom: 30, 
    opacity: 0.85,
  },
  textNameScreen: {
    color: '#fff',
    fontSize: 26,   
    marginBottom: 40, 
    opacity: 0.85,
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
  captionText: {
    flexDirection: 'row',
  },
  caption: {
    width: '100%',
    marginLeft: 10,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.5,

  },
  caption1: {
    width: '9%',
    marginRight: 10,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.5,

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
  captionInput: {
    color: '#fff',
    width: 63,
  },
  textError: {
    color: THEME.RED_COLOR,
    marginBottom: 10,
  }
})