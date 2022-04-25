import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import { Profile , Update , Test , History} from '../screens/index';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"



const Tab = createMaterialBottomTabNavigator();



const BottomTabs =( {navigation}) => {
 


  return (
  
    <Tab.Navigator
    initialRouteName="index"
    activeColor="white"
    barStyle={{ backgroundColor: 'green' }}
  >
    <Tab.Screen
      name="index"
      component={Profile}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Update}
      options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Test"
      component={Test}
      options={{
        tabBarLabel: 'Test',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="test-tube" color={color} size={26} />
        ),
      }}
    />
     <Tab.Screen
      name="d"
      component={History}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="history" color={color} size={26} />
        ),
      }}
    />
 
  
  </Tab.Navigator>



  


  ) 

}
   
  
export {BottomTabs} ;