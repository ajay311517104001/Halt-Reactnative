import React, { useState ,useEffect} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {URL} from '../api_configs/APIProxy'
import {getMenuQuery, updateMenuQuery , incomingOrderQuery , getIncomingOrderQuery,exitFromFlowQuery,cancelOrderQuery ,updateOrderQuery} from '../api_configs/APIQueries'
import {updateMenuVariables , incomingOrderVariables , exitFromFlowVariables , cancelOrderVariables ,updateOrderVariable} from '../api_configs/APIVariable'
import { Home , IncomingOrder , History , Notes ,SwipeGesture} from '../screens/index';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { DrawerItemList } from '@react-navigation/drawer';



const Tab = createMaterialBottomTabNavigator();



const BottomTabs =( ) => {
  const [orders, setOrders] = useState([])
  const [trigger, setTrigger] = useState(0)
  const [completed_order,setCompletedOrder]=useState([])
  const [incompleted_order,setInCompletedOrder]=useState([])
  const [editStatus,setEditStatus]=useState(false)
  const [editData,setEditData]=useState({})

const onPlaceOrder = async(items,name,total) =>{
  
  if(items && total && name){

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

  //    {stateChange=='0'? setStateChange('1') : setStateChange('0') }
  }catch(err){
      console.log("error in  updating orders",err)
  
  }
  }

}


const onExitFromFlow = async(item)=>{

  let completedOrder=[]
  let inCompletedOrder=[]
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
        // setOrders(result.data.exitFromFlow.orderList)
        for(let i=0; i<result.data.exitFromFlow.orderList.length ; i++){
          if(result.data.exitFromFlow.orderList[i].status=='true'){
                completedOrder.push(result.data.exitFromFlow.orderList[i])
          }else{
                 inCompletedOrder.push(result.data.exitFromFlow.orderList[i])
          }
          }
               setCompletedOrder(completedOrder)
               setInCompletedOrder(inCompletedOrder)


} catch (err) {
    console.log("error in fetching the menu list", err)
}

}


const onCancelFromFlow = async(item)=>{
    let completedOrder=[]
    let inCompletedOrder=[]
  try {
    // console.log("this is the type===========>", typeof JSON.stringify(obj))
    cancelOrderVariables.input.id=item.id
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',



        },
        body: JSON.stringify({ query: cancelOrderQuery , variables:cancelOrderVariables  }),
    });

    const result = await response.json()
        //  setOrders(result.data.cancelOrder.orderList)
         for(let i=0; i<result.data.cancelOrder.orderList.length ; i++){
          if(result.data.cancelOrder.orderList[i].status=='true'){
                completedOrder.push(result.data.cancelOrder.orderList[i])
          }else{
                 inCompletedOrder.push(result.data.cancelOrder.orderList[i])
          }
          }
               setCompletedOrder(completedOrder)
               setInCompletedOrder(inCompletedOrder)

} catch (err) {
    console.log("error in fetching the menu list", err)
}

}

const onEditDataFromFlow =(item)=>{

  setEditStatus(true)
  setEditData(item)
}


const onUpdateOrder = async(items,name,total) =>{

  let inCompletedOrder=[]
  let completedOrder=[]
  if(items && total && name && editData.id){

    try{
      updateOrderVariable.input.id=editData.id
      updateOrderVariable.input.name=String(name)
      updateOrderVariable.input.items=items
      updateOrderVariable.input.total=String(total)
      //https://halt-server.herokuapp.com/graphql
      const response = await fetch(URL, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         'access-control-allow-origin': '*',
  
  
  
       },
       body: JSON.stringify({ query: updateOrderQuery ,variables : updateOrderVariable  }),
     });
  
     const result = await response.json()
     if(result.data.updateOrder.orderList){
      for(let i=0; i<result.data.updateOrder.orderList.length ; i++){
        if(result.data.updateOrder.orderList[i].status=='true'){
              completedOrder.push(result.data.updateOrder.orderList[i])
        }else{
               inCompletedOrder.push(result.data.updateOrder.orderList[i])
        }
        }
             setCompletedOrder(completedOrder)
             setInCompletedOrder(inCompletedOrder)
     }
  //    {stateChange=='0'? setStateChange('1') : setStateChange('0') }
  }catch(err){
      console.log("error in  updating orders",err)
  
  }
  }

}

useEffect(() => {

  const getIncomingOrder = async () => {
     let inCompletedOrder=[]
     let completedOrder=[]
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
          for(let i=0; i<result.data.getIncomingOrders.orderList.length ; i++){
          if(result.data.getIncomingOrders.orderList[i].status=='true'){
                completedOrder.push(result.data.getIncomingOrders.orderList[i])
          }else{
                 inCompletedOrder.push(result.data.getIncomingOrders.orderList[i])
          }
          }
               setCompletedOrder(completedOrder)
               setInCompletedOrder(inCompletedOrder)
              //  setOrders(result.data.getIncomingOrders.orderList)
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
      children={()=> <Home onPlaceOrder={onPlaceOrder} editStatus={editStatus}  editData={editData} setEditStatus={setEditStatus} onUpdateOrder={onUpdateOrder}/>}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      
      // children={()=> < IncomingOrder orders={orders} onExitFromFlow={onExitFromFlow} onCancelFromFlow={onCancelFromFlow}/> }
     children={ ()=>< SwipeGesture orders={incompleted_order} onExitFromFlow={onExitFromFlow} onCancelFromFlow={onCancelFromFlow} onEditDataFromFlow={onEditDataFromFlow}/> }
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
      name="History"
      children={()=>< History orders={completed_order}/>}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="history" color={color} size={26} />
        ),
      }}
    />
  <Tab.Screen
      name="Notes"
      children={()=>< Notes />}
      options={{
        tabBarLabel: 'Notes',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="newspaper" color={color} size={26} />
        ),
      }}
    />
 
  
  </Tab.Navigator>



  


  ) 

}
   
  
export {BottomTabs} ;