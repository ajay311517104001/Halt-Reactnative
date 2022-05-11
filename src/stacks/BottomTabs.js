import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import { Home , Update , History} from '../screens/index';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"



const Tab = createMaterialBottomTabNavigator();



const BottomTabs =( ) => {
 


  return (
  
    <Tab.Navigator
    initialRouteName="index"
    activeColor="white"
    barStyle={{ backgroundColor: 'rgb(71,8,4)' }
  }
  
  >
    <Tab.Screen
      name="index"
      component={Home}
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
        tabBarLabel: 'Orders',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Test"
      component={Test}
      options={{
        tabBarLabel: 'Test',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="test-tube" color={color} size={26} />
        ),
      }}
    /> */}
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