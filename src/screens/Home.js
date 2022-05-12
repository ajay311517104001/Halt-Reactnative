
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image ,  } from 'react-native';
import NewItemModal from '../components/Modals/NewItemModal'
import {getMenuQuery, updateMenuQuery} from '../api_configs/APIQueries'
import {updateMenuVariables} from '../api_configs/APIVariable'
import { Box, Input, VStack, Icon, Text, ScrollView, Button, Menu, Center ,Heading} from 'native-base'
import { getTotalDiskCapacityOld } from 'react-native-device-info';
const { width, height } = Dimensions.get('window');


var items = [
    {
        id: 1,
        name: 'Tea',
        price: '20'
    },
    {
        id: 2,
        name: 'Iced tea',
        price: '49'
    },
    {
        id: 3,
        name: 'Filter coffee',
        price: '25'
    },
    {
        id: 4,
        name: 'Black Coffee',
        price: '15'
    },
    {
        id: 5,
        name: 'Cafe Latte',
        price: '60'
    },
    {
        id: 6,
        name: 'Hot Chocolate',
        price: '80'
    },
    {
        id: 7,
        name: 'Iced Coffee',
        price: '99'
    },
    {
        id: 8,
        name: 'Iced Latte',
        price: '120'
    },
    {
        id: 9,
        name: 'Caramel Macchiato',
        price: '130'
    },
    {
        id: 10,
        name: 'Iced Mocha',
        price: '120'
    },
    {
        id: 11,
        name: 'Sweet Cream Latte',
        price: '130'
    },
    {
        id: 12,
        name: 'Sweet Cream Latte',
        price: '130'
    },
    {
        id: 13,
        name: 'Iced chocolate',
        price: '140'
    },
    {
        id: 14,
        name: 'Iced truffle',
        price: '140'
    },
];

const Home = () => {
    let total =0
const [menu,setMenu]=useState([])
const [showModal, setShowModal] = useState(false);
const [stateChange,setStateChange]=useState('0')
const [name,setName]=useState('')

const onHandlePlaceOrder=()=>{
    const items=[]
    
    for(let i=0 ; i<menu.length;i++){
        if(menu[i].count>0){
         items.push({
             item_name:menu[i].item,
             count:menu[i].count,

         })
        }
    }
    console.log("on handle place orders",typeof JSON.stringify(items),total,name)
}

const onDecrement =(item,index)=> {

  if(item.count>0){
    const Menu=[...menu]
    Menu[index].count= Number(Menu[index].count)-1
    setMenu(Menu)
  }
}

const onIncrement=(item,index)=>{


    console.log("this is increment",menu)
   
    const Menu=[...menu]
    Menu[index].count= Number(Menu[index].count)+1
    // console.log("this is the index of the state element",Menu[index].count= Number(Menu[index].count)+1)
    setMenu(Menu)
}
const handleNewItem = async (item,type,price)=>{
   console.log('========>',item,type,price)
   try{
    updateMenuVariables.input.item=item
    updateMenuVariables.input.type=type
    updateMenuVariables.input.price=price
    //https://halt-server.herokuapp.com/graphql
    const response = await fetch('http://192.168.1.2:9000/graphql', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'access-control-allow-origin': '*',



     },
     body: JSON.stringify({ query: updateMenuQuery ,variables : updateMenuVariables  }),
   });

   const result = await response.json()
   console.log("the response is",result)
   {stateChange=='0'? setStateChange('1') : setStateChange('0') }
}catch(err){
    console.log("error in fetching the menu list",err)

}
}

const getTotal =(i)=>{
   
total=total+i

return i
}



    useEffect(()=>{
        const getMenu = async() =>{
            const obj ={
                key:{
                    key2:"sdffd"
                }
            }
            try{
                // console.log("this is the type===========>", typeof JSON.stringify(obj))
                const response = await fetch('http://192.168.1.2:9000/graphql', {
                 method: 'POST',
                 headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'access-control-allow-origin': '*',
         
         
         
                 },
                 body: JSON.stringify({ query: getMenuQuery  }),
               });
         
               const result = await response.json()
                console.log('the menu list ',result.data.getMenu.menuList)
                const menuList=result.data.getMenu.menuList;
                // obj = {...menuList, count: '0'};
               
                menuList.forEach((item) => {
                      item.count='0'
                    
                });
                console.log('the menu list are=================>', menuList)
                setMenu(menuList)
           }catch(err){
           console.log("error in fetching the menu list",err)
           }
        }
        getMenu()
    },[stateChange])

    return (
        <Box flex={1}>
            <Box flex={.4} bg='rgb(71,8,4)' alignItems='center' justifyContent='center' >
                <Image source={require('./../assets/images/logo.jpeg')} />
            </Box>
            <Box flex={1.7}  >
                <Box flex={.5}  flexDirection='row' justifyContent='space-around' alignItems='center' >
                    <Box  width='40%' right='40%'>
                  <Input onChangeText={ text =>setName(text)}/>
                    </Box>
                    <Box left='15%'>
                     <Button borderRadius={1000} height={height* 0.07} width={width*0.18}  color='white' bg='rgb(71,8,4)' onPress={()=>setShowModal(true)}>Item +</Button>
                    </Box>
                 
                </Box>
    
                <Box flex={2}  justifyContent='center' alignItems='center' borderBottomWidth={4} borderBottomColor='rgb(71,8,4)'>
                    <Box flexDirection='row' width='100%' justifyContent='space-around' alignItems='center' height={height * 0.03} bg='rgb(71,8,4)'>
                        <Text alignItems='center' color='white'> ITEMS </Text>
                        <Text alignItems='center' color='white' mr={width * .15}> PRICE </Text>
                        <Text alignItems='center' color='white'> OPERATION </Text>
                    </Box>
                    <ScrollView width='100%' >
                        {
                            menu.map((item, index) => (
                                <Box flexDirection='row'  key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)'>
                                    <Box width='30%' alignItems='center'  bg='red.100' >  <Text fontSize='md'  > {item.item}</Text></Box>
                                    <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box>
                                    {/* <Box width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box> */}
                                    <Box flexDirection='row' justifyContent='space-evenly' bg='red.100' width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>
                                      <Box><Button bg='rgb(71,8,4)' onPress={()=>onDecrement(item,index)}> - </Button></Box>  
                                      <Box><Text>{item.count}</Text></Box>  
                                        <Box><Button bg='rgb(71,8,4)' onPress={()=>onIncrement(item,index)}> + </Button></Box>  
                                        </Box>
                                </Box>
                            ))
                        }
                    </ScrollView>


                </Box>
            </Box>
            <Box flex={1}   flexDirection='row'  >
            <Box flex={2}   >
            <Center bg='rgb(71,8,4)' width='100%' height={height * 0.03}><Text fontSize='xl' fontWeight='extrabold' color='white' >SUMMARY</Text></Center> 
                    <Box flexDirection='row' width='100%' justifyContent='space-around' alignItems='center' height={height * 0.03} bg='rgb(71,8,4)'>
                        <Text alignItems='center' color='white'> ITEMS </Text>
                        <Text alignItems='center' color='white' mr={width * .1}> QUANTITY </Text>
                        <Text alignItems='center' color='white'> PRICE </Text>
                    </Box>
            <ScrollView width='100%' >
                        {  
                        
                            menu.map((item, index) => {
                              
                            if(item.count>0){

                          
                        
                               return (
                                
                                    <Box flexDirection='row'  key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)'>
                                        <Box width='30%' alignItems='center'  bg='red.100' >  <Text fontSize='lg'  > {item.item}</Text></Box>
                                        <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1} flexDirection='row' justifyContent='center' >   <Text fontSize='lg' mt='15%' >  {item.price} X {item.count} </Text></Box>
                                        <Box width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1} >  <Text fontSize='lg'  > {getTotal(item.price * item.count)} </Text></Box>
                                        {/* <Box flexDirection='row' justifyContent='space-evenly' bg='red.100' width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>
                                          <Box><Button bg='rgb(71,8,4)' onPress={()=>onDecrement(item,index)}> - </Button></Box>  
                                          <Box><Text>{item.count}</Text></Box>  
                                            <Box><Button bg='rgb(71,8,4)' onPress={()=>onIncrement(item,index)}> + </Button></Box>  
                                            </Box> */}
                                    </Box>
                                )
                            }
                            })
                        }
                    </ScrollView>
            </Box>
            <Box flex={1}  borderLeftColor='rgb(71,8,4)' borderLeftWidth={2}>
                <Box flex={1}  alignItems='center'  >
                <Center bg='rgb(71,8,4)' width='100%' height={height * 0.03}><Text fontSize='2xl' fontWeight='extrabold' color='white' >TOTAL</Text></Center> 
<Box  w='100%' h='80%' justifyContent='center' alignItems='center'> <Heading size='2xl' color='rgb(71,8,4)' >{total + ' ₹'} </Heading></Box> 
   
                </Box>
                <Box flex={1} borderTopColor='rgb(71,8,4)' borderTopWidth='2' >
                  <Button bg='rgb(71,8,4)' py='10'  borderRadius={100} top='13%' onPress={onHandlePlaceOrder}>
                  <Heading size='lg' color='white' >PLACE ORDER </Heading>
                  </Button>
                </Box>
            </Box>
            </Box>

                <NewItemModal showModal={showModal} setShowModal={setShowModal} handleNewItem={handleNewItem}/>


        </Box>


    );
}

export default Home;