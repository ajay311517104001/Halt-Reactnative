
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image ,  } from 'react-native';
import NewItemModal from '../components/Modals/NewItemModal'
import {getMenuQuery, updateMenuQuery} from '../api_configs/APIQueries'
import {updateMenuVariables} from '../api_configs/APIVariable'
import { Box, Input, VStack, Icon, Text, ScrollView, Button } from 'native-base'
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

const [menu,setMenu]=useState([])
const [showModal, setShowModal] = useState(false);
const [stateChange,setStateChange]=useState('0')

const handleNewItem = async (item,type,price)=>{
   console.log('========>',item,type,price)
   try{
    updateMenuVariables.input.item=item
    updateMenuVariables.input.type=type
    updateMenuVariables.input.price=price
    const response = await fetch('https://halt-server.herokuapp.com/graphql', {
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



    useEffect(()=>{
        const getMenu = async() =>{
            try{
                const response = await fetch('https://halt-server.herokuapp.com/graphql', {
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
            <Box flex={1.7} >
                <Box flex={.5}  flexDirection='row' justifyContent='space-around' alignItems='center' >
                    <Box  width='40%' right='40%'>
                  <Input/>
                    </Box>
                    <Box left='15%'>
                     <Button borderRadius={1000} height={height* 0.07} width={width*0.18}  color='white' bg='rgb(71,8,4)' onPress={()=>setShowModal(true)}>Item +</Button>
                    </Box>
                 
                </Box>
    
                <Box flex={2}  justifyContent='center' alignItems='center' >
                    <Box flexDirection='row' width='100%' justifyContent='space-around' alignItems='center' height={height * 0.03} bg='rgb(71,8,4)'>
                        <Text alignItems='center' color='white'> ITEMS </Text>
                        <Text alignItems='center' color='white' mr={width * .15}> PRICE </Text>
                        <Text alignItems='center' color='white'> OPERATION </Text>
                    </Box>
                    <ScrollView width='100%' >
                        {
                            menu.map((item, index) => (
                                <Box flexDirection='row'  key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)'>
                                    <Box width='30%' alignItems='center'  >  <Text fontSize='md'  > {item.item}</Text></Box>
                                    <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box>
                                    <Box width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box>
                                </Box>
                            ))
                        }
                    </ScrollView>


                </Box>
            </Box>
            <Box flex={1} bg='blue.100' justifyContent='center' alignItems='center'>
                summary
            </Box>

                <NewItemModal showModal={showModal} setShowModal={setShowModal} handleNewItem={handleNewItem}/>


        </Box>


    );
}

export default Home;