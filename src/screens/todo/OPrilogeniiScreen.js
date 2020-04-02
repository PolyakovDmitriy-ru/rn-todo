import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Linking } from 'react-native';
import { AppText } from '../../components/AppText';
import { THEME } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const OPrilogeniiScreen = () => {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.saveArea}>
        <View style={styles.logo}>
          <Text style={styles.textLogo}>ДП</Text>
        </View>
        <AppText style={styles.textName}>Мои Делишки</AppText>
        <AppText style={styles.text}>Версия: 1.0.3</AppText>
        <AppText style={styles.text}>Разработчкик: Поляков Дмитрий Владимирович</AppText>
        <View style={styles.sait}>
          <AppText style={styles.text}>Сайт: </AppText>
          <TouchableOpacity onPress={() => Linking.openURL('https://polyakovdmitriy.ru/')}>
            <AppText style={styles.textSait}>polyakovdmitriy.ru</AppText>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  saveArea: {
    alignItems: "center",
  },
  logo: {
    borderWidth: 8,
    width: 150,
    height: 150,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.85,
  },
  textLogo: {
    fontFamily: 'napoleon',
    color: THEME.MAIN_COLOR,
    fontSize: 50,
  },
  textName: {
    color: THEME.MAIN_COLOR,
    fontSize: 25,   
    marginBottom: 50, 
    opacity: 0.85,
  },
  text: {
    marginBottom: 15,
  },
  sait: {
    flexDirection: 'row',
  },
  textSait: {
    color: THEME.MAIN_COLOR,
  }
})