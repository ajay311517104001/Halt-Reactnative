import React, { useState ,useEffect} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {URL} from '../api_configs/APIProxy'
import {getMenuQuery, updateMenuQuery , incomingOrderQuery , getIncomingOrderQuery,exitFromFlowQuery} from '../api_configs/APIQueries'
import {updateMenuVariables , incomingOrderVariables , exitFromFlowVariables} from '../api_configs/APIVariable'
import { Home , IncomingOrder , History} from '../screens/index';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { DrawerItemList } from '@react-navigation/drawer';



const Tab = createMaterialBottomTabNavigator();



const BottomTabs =( ) => {
  const [orders, setOrders] = useState([])
  const [trigger, setTrigger] = useState(0)

const onPlaceOrder = async(items,name,total) =>{
  
  if(items && total && name){
    console.log("the items are ===>", items, total , name )
    try{
      incomingOrderVariables.input.name=String(name)
      incomingOrderVariables.input.items=items
      incomingOrderVariables.input.total=String(total)
      //https://halt-server.herokuapp.com/graphql
      const response = await fetch(URL, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         'access-control-allow-origin': '*',
  
  
  
       },
       body: JSON.stringify({ query: incomingOrderQuery ,variables : incomingOrderVariables  }),
     });
  
     const result = await response.json()
     if(result.data.incomingOrder.message=="success"){
      if(trigger==1){
        setTrigger(0)
      }else{
        setTrigger(1)
      }
     }
     console.log("the response is",result)
  //    {stateChange=='0'? setStateChange('1') : setStateChange('0') }
  }catch(err){
      console.log("error in  updating orders",err)
  
  }
  }

}

const onExitFromFlow = async(item)=>{
  console.log('=========> EXIT FROM FLOW API HIT',item)
    
  try {
    // console.log("this is the type===========>", typeof JSON.stringify(obj))
    exitFromFlowVariables.input.id=item.id
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',



        },
        body: JSON.stringify({ query: exitFromFlowQuery , variables:exitFromFlowVariables  }),
    });

    const result = await response.json()
    console.log('the incoming order list----------------> ', result.data.exitFromFlow.orderList)
        setOrders(result.data.exitFromFlow.orderList)


} catch (err) {
    console.log("error in fetching the menu list", err)
}

}



useEffect(() => {

  const getIncomingOrder = async () => {
     
      try {
          // console.log("this is the type===========>", typeof JSON.stringify(obj))
          const response = await fetch(URL, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'access-control-allow-origin': '*',



              },
              body: JSON.stringify({ query: getIncomingOrderQuery }),
          });

          const result = await response.json()
          console.log('the incoming order list----------------> ', result.data.getIncomingOrders.orderList)
          console.log("======================> useeffect hits")

              setOrders(result.data.getIncomingOrders.orderList)
      } catch (err) {
          console.log("error in fetching the menu list", err)
      }
  }
  getIncomingOrder()

}
, [trigger])
  return (
  
    <Tab.Navigator
    initialRouteName="index"
    activeColor="white"
    barStyle={{ backgroundColor: 'rgb(71,8,4)' }
  }
  
  >
    <Tab.Screen
      name="index"
      children={()=> <Home onPlaceOrder={onPlaceOrder}/>}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      
      children={()=> < IncomingOrder orders={orders} onExitFromFlow={onExitFromFlow}/> }
     
      options={{
        tabBarLabel: 'Orders',
        
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26}  />
            
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
      children={()=>< History orders={orders}/>}
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