import React, {  } from 'react';
import { NavigationContainer } from '@react-navigation/native';


import {Box,NativeBaseProvider , View,Text} from  'native-base';

import {Rootstack} from './src/stacks/index'
import {BottomTabs} from './src/stacks/BottomTabs'


const App = () => {


  return (
    <NativeBaseProvider>
    <NavigationContainer>
    <BottomTabs />
    </NavigationContainer>
   
   </NativeBaseProvider>
  );
}

export default App;