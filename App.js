import React, {  } from 'react';


import {Box,NativeBaseProvider , View,Text} from  'native-base';

import {Rootstack} from './src/stacks/index'



const App = () => {


  return (
    <NativeBaseProvider>
    
    <Rootstack />
   </NativeBaseProvider>
  );
}

export default App;