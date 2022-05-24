import React, { useEffect, useState } from 'react';
import { Dimensions, } from 'react-native';
import { Box, Image, Text, Center, Button,Modal, ScrollView } from 'native-base'
import { getIncomingOrderQuery } from '../api_configs/APIQueries'
import {URL} from '../api_configs/APIProxy'
const { width, height } = Dimensions.get('window');
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const IncomingOrder = (props) => {


   console.log("this is the trigger",props)
    // const [orders, setOrders] = useState([])
    const {orders}=props
    const [showModal, setShowModal] = useState(false);
    const [viewItem,setViewItem]=useState([])


    // if(c==0){
    //    setC(1)
    // }else{
    //     setC(0)
    // }
    // const onExitFlow =(item)=>{
    //     props.onExitFromFlow(item)
    // }
    const onViewItems =(index)=>{
        console.log("this is the index",orders[index])
        setViewItem(orders[index])
        
        setShowModal(true)
    }
    // useEffect(() => {

    //     const getIncomingOrder = async () => {
           
    //         try {
    //             // console.log("this is the type===========>", typeof JSON.stringify(obj))
    //             const response = await fetch(URL, {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     'access-control-allow-origin': '*',



    //                 },
    //                 body: JSON.stringify({ query: getIncomingOrderQuery }),
    //             });

    //             const result = await response.json()
    //             console.log('the incoming order list----------------> ', result.data.getIncomingOrders.orderList)
    //             console.log("======================> useeffect hits")

    //                 setOrders(result.data.getIncomingOrders.orderList)
    //         } catch (err) {
    //             console.log("error in fetching the menu list", err)
    //         }
    //     }
    //     getIncomingOrder()

    // }
    // , [props.trigger])


    return (
        <Box flex={1} >
            <Box flex={.11} bg='rgb(71,8,4)' alignItems='center' justifyContent='center' >
                <Image source={require('./../assets/images/logo.jpeg')} alt='logo' size='sm' />
            </Box>
            <Box flex={1} alignItems='center' >
                <Box h={height * 0.03} width='95%' mt='1%' flexDirection='row' alignItems='center' bg='rgb(71,8,4)' >
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}>Name</Box>
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}> Items</Box>
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}>Total</Box>
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}>Payment Status</Box>
                </Box>

                <ScrollView  >
                 <Box   alignItems='center'>
                {
 
                    orders.map((order, index) => {
                     if(order.status=='false'){
                         return(
                            <Box bg='red.100' h={height * 0.05} width='97%' mt='1.5%' key={index} flexDirection='row' alignItems='center'>

                            <Box width='25%' alignItems='center' _text={{ fontSize:'sm', fontWeight:'bold',ml:'11%'}} flexDirection='row' justifyContent='flex-start' >
                            <MaterialCommunityIcons name="chevron-left-circle" color='rgb(71,8,4)' size={30}  onPress={()=> console.log('dosta')}/>

                                {order.name}</Box>
                            <Box width='25%' alignItems='center' ><Button bg='rgb(71,8,4)' onPress={()=>onViewItems(index)} size='xs'>View Order</Button></Box>
                            <Box width='25%' alignItems='center' _text={{ fontSize:'sm'}} flexDirection='row' justifyContent='center'>{order.total + ' Rs'} </Box>
                            <Box width='25%' alignItems='center' flexDirection='row' justifyContent='space-evenly' marginLeft='2%'>
                            <MaterialCommunityIcons name="location-exit" color={'green'} size={30}  onPress={()=> props.onExitFromFlow(order)}/>

                            <MaterialCommunityIcons name="alpha-x-circle-outline" color={'red'} size={20}  onPress={()=> props.onCancelFromFlow(order)}/>
                            </Box>


                        </Box>
                         )
                     }
                    }
                   
                    
                        // console.log("============>",order)
                        
                      
                    )
                }
             </Box>
                    </ScrollView>


            </Box>

            <Center>

                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header bg='rgb(71,8,4)' height={height *0.06} _text={{color:'white'}} >  {viewItem.name} </Modal.Header>
                        <Modal.Body height={height *0.15} bg='red.100'>
                            <ScrollView>
                           {
                                (viewItem.items? viewItem.items : []).map((item, index) => (
                                    <Box  width='95%' mt='2%' ml='5%' key={index} flexDirection='row' alignItems='center' _text={{ fontSize:'lg'}
                                        
                                    }>
            
                                           {"->"} {item.item_name} X {item.count}
                                    </Box>))
                           }
                           </ScrollView>
                        </Modal.Body>
                        <Modal.Footer bg='rgb(71,8,4)' >
                          <Text fontSize='lg' fontWeight='bold' color='white' > Total : {viewItem.total} rs</Text>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>


        </Box>
    );
}

export default IncomingOrder;