import * as Font from 'expo-font';

export async function start() {
  try {
    await Font.loadAsync({
      'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),    
      'napoleon': require('../assets/fonts/11720.ttf'),  
    })
    //await DB.init();
    //console.log('Database started...');

  } catch (e) {
    console.log('Error: ', e);
  }
}