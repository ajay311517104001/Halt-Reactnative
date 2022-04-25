import React from 'react';
import {Box,NativeBaseProvider , View,Text ,Button} from  'native-base';
function HomeScreen( {navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
        
        onPress={() => {navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      >Go to details</Button>
      </View>
    );
  }
  
  function DetailsScreen({navigation }) {
     
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
        
        onPress={() => navigation.navigate('Home')}
      >Go to Home</Button>
      </View>
    );
  }

export {HomeScreen,DetailsScreen};