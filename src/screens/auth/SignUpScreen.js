import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Animated, SafeAreaView, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import { THEME } from '../../theme';
import { AppText } from '../../components/AppText';
import { AppButton1 } from '../../components/AppButton1';
import { signup } from '../../actions/auth';
import * as types from '../../constants/auth';

export const SignUpScreen = ({navigation, route}) => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(null);
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
    if (services.isFetching.signUp) {
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
      if (services.message.variantMsg==='success') {
        navigation.navigate('ZadatParol', {
          email: email,
        });
      } else {
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

    }
  }, [services.message])

  let elButton = null;
  let textNameScreen = 'Регистрация';
  if (route.params.textButton === 'Восстановить пароль') {
    textNameScreen = 'Восстановление пароля';
    elButton = 
      <TouchableOpacity onPress={()=>navigation.navigate('SignUp', {textButton: 'Зарегистрироваться'})}>
        <AppText style={styles.text}>Регистрация</AppText>
      </TouchableOpacity>   
  } else {
    elButton = 
      <TouchableOpacity onPress={()=>navigation.navigate('SignUp', {textButton: 'Восстановить пароль'})}>
        <AppText style={styles.text}>Забыли пароль?</AppText>
      </TouchableOpacity>
  }

  const onPressSignUp = () =>{

    dispatch(signup(email, 'Для завершения регистрации, подтвердите адрес электроноой почты!'));
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
          <AppText style={styles.textNameScreen}>{textNameScreen}</AppText>
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

          <View style={styles.groupButton}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
              <AppText style={styles.text}>Страница входа</AppText>
            </TouchableOpacity>
            {elButton}
          </View>

          <Animated.View style={{opacity: fadeAnim}}>
            <AppText style={styles.textError}>Ошибка: {services.message.msg}</AppText>
          </Animated.View>
          
          <AppButton1 onPress={onPressSignUp}>{route.params.textButton}</AppButton1>

          {loading}
        </SafeAreaView>
      </View>  
    </TouchableWithoutFeedback>

  )
}

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
    width: '7%',
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