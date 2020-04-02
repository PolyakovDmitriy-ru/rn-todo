import React, { useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, StatusBar, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {AppButton1} from '../../components/AppButton1';
import { AppText } from '../../components/AppText';
import { recieveAuth } from '../../actions/auth';
import { THEME } from '../../theme';


export const StartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isStartAuth = useSelector(state => state.services.isFetching.startAuth);

  useEffect(()=>{
    if (!isAuthenticated) {
      dispatch(recieveAuth());
    }   
  }, [isAuthenticated])

  if (isAuthenticated) {
    navigation.navigate('DrawerNavigator');
    return null;
  }

  let loading = null;

  if (!isStartAuth) {
    loading = (
      <View>
        <ActivityIndicator color='#fff' />
      </View>
    )
  } else {
    loading = (
      <React.Fragment>
        <View>
          <AppButton1 onPress={() => {navigation.navigate('SignIn')}}>Войти</AppButton1>
        </View>  
        <View>
          <AppButton1 onPress={() => {navigation.navigate('SignUp', {textButton: 'Зарегистрироваться'})}}>Зарегистрироваться</AppButton1>
        </View>  
      </React.Fragment>      
    )
  }

  return (
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
      <StatusBar barStyle='light-content'/>
      <SafeAreaView style={styles.saveArea}>

        <View style={styles.logo}>
          <Text style={styles.textLogo}>ДП</Text>
        </View>
        <AppText style={styles.textName}>Мои Делишки</AppText>
        {loading}  
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.MAIN_COLOR,
  },
  logo: {
    borderWidth: 8,
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.85,
  },
  saveArea: {
    alignItems: "center",
  },
  textLogo: {
    fontFamily: 'napoleon',
    color: '#fff',
    fontSize: 50,
  },
  textName: {
    color: '#fff',
    fontSize: 25,   
    marginBottom: 120, 
    opacity: 0.85,
  },
})