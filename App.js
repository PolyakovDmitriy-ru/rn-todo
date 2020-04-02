import React, {useState} from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import { start } from './src/start';
import configureStore from './src/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const store = configureStore();

  if (!isReady) {
    return (
      <AppLoading 
        startAsync={start} 
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}