
import React, { useEffect, useState } from 'react';
import { Dimensions, View, } from 'react-native';
import NewItemModal from '../components/Modals/NewItemModal'
import { URL } from '../api_configs/APIProxy'
import { getMenuQuery, updateMenuQuery, incomingOrderQuery ,deleteMenuItemQuery } from '../api_configs/APIQueries'
import { updateMenuVariables, incomingOrderVariables , deleteMenuItemVariable} from '../api_configs/APIVariable'
import { Box, Input, VStack, Icon, Text, ScrollView, Button, Menu, Center, Heading, Spinner, HStack, Image } from 'native-base'
import { getTotalDiskCapacityOld } from 'react-native-device-info';
const { width, height } = Dimensions.get('window');


var items_ = [
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

const Home = (props) => {
    let total = 0
    const [menu, setMenu] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [defaultMenu, setDefaultMenu] = useState([])
    const [stateChange, setStateChange] = useState('0')
    const [name, setName] = useState('')
    const [spinner, setSpinner] = useState(true)
    const [spinner1, setSpinner1] = useState(false)
    const [editName, setEditName] = useState('')
    const [editStatus, setEditStatus] = useState(false)
    const [editItems, setEditItems] = useState([])

    const onReset = () => {
        if (editStatus) {
            props.setEditStatus(false)
            setEditName('')
            // setEditData({})
        } else {
            if (name || menu) {

                let menu_clone = JSON.parse(JSON.stringify(menu))
                menu_clone.forEach((item) => {
                    item.count = '0'

                });
                setName('')
                setMenu(menu_clone)
            }

        }

    }

    const onEarlyReset=()=>{
        if (name || menu) {

            let menu_clone = JSON.parse(JSON.stringify(menu))
            menu_clone.forEach((item) => {
                item.count = '0'

            });
            setName('')
            setMenu(menu_clone)
        }
    }


    const onHandlePlaceOrder =  () => {
        if(editStatus){
            setSpinner1(true)
        }else{
            setSpinner1(true)
        const items = []

        for (let i = 0; i < menu.length; i++) {
            if (menu[i].count > 0) {
                items.push({
                    item_name: menu[i].item,
                    count: String(menu[i].count),

                })
            }
        }

        props.onPlaceOrder(items, name, total)
            .then(() => {
                setSpinner1(false)
                onReset()
            })

        }



    }


    const onHandleUpdateOrder =  () => {
    
            setSpinner1(true)
        const items = []

        for (let i = 0; i < editItems.length; i++) {
            if (editItems[i].count > 0) {
                items.push({
                    item_name: editItems[i].item,
                    count: String(editItems[i].count),

                })
            }
        }

        props.onUpdateOrder(items, editName, total)
            .then(() => {
                setSpinner1(false)
                onReset()
            })}


    const onDecrement = (item, index) => {
        if(editStatus){
            if (item.count > 0) {
                 const editItemsManipulation = [...editItems]
                 editItemsManipulation[index].count = Number(editItemsManipulation[index].count) - 1
                 setEditItems(editItemsManipulation)
            }
        }else{
            if (item.count > 0) {
                const Menu = [...menu]
                Menu[index].count = Number(Menu[index].count) - 1
                setMenu(Menu)
            }
        }
       
    }

    const onIncrement = (item, index) => {

    if(editStatus){
        const editItemsManipulation = [...editItems]
        editItemsManipulation[index].count = Number(editItemsManipulation[index].count) + 1
        // console.log("this is the index of the state element",Menu[index].count= Number(Menu[index].count)+1)
        setEditItems(editItemsManipulation)
    }else{

        const Menu = [...menu]
        Menu[index].count = Number(Menu[index].count) + 1
        // console.log("this is the index of the state element",Menu[index].count= Number(Menu[index].count)+1)
        setMenu(Menu)
    }
       
    }
    const handleNewItem = async (item, type, price) => {
        try {
            updateMenuVariables.input.item = item
            updateMenuVariables.input.type = type
            updateMenuVariables.input.price = price
            //https://halt-server.herokuapp.com/graphql
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*',



                },
                body: JSON.stringify({ query: updateMenuQuery, variables: updateMenuVariables }),
            });

            const result = await response.json()
            { stateChange == '0' ? setStateChange('1') : setStateChange('0') }
        } catch (err) {
            console.log("error in fetching the menu list", err)

        }
    }
    
    const ondeleteItem = async(item,index)=>{
        try {

            deleteMenuItemVariable.input.id= String(item.id)
            // console.log("this is the type===========>", typeof JSON.stringify(obj))
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*',



                },

                body: JSON.stringify({ query: deleteMenuItemQuery , variables : deleteMenuItemVariable }),
            });

            const result = await response.json()
            if(result.data.deleteMenuItem.message=="success"){
                { stateChange == '0' ? setStateChange('1') : setStateChange('0') }
            }

    
        } catch (err) {
            console.log("error in fetching the menu list", err)
        }

    }
    
    
    
    const getTotal = (i) => {

        total = total + i

        return i
    }



    useEffect(() => {


        const getMenu = async () => {

            try {
                // console.log("this is the type===========>", typeof JSON.stringify(obj))
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*',



                    },
                    body: JSON.stringify({ query: getMenuQuery }),
                });

                const result = await response.json()
                const menuList = result.data.getMenu.menuList;
                // obj = {...menuList, count: '0'};

                menuList.forEach((item) => {
                    item.count = '0'

                });


                setMenu(menuList)
                setSpinner(false)
            } catch (err) {
                console.log("error in fetching the menu list", err)
            }
        }
        getMenu()
    }, [stateChange])



    useEffect(() => {
        if (props.editStatus) {
           // onEarlyReset()
            setEditStatus(true)
            setEditName(props.editData.name)
            let editItems = props.editData.items
            let menu_clone = JSON.parse(JSON.stringify(menu))

            menu_clone.forEach((item) => {
                item.count = '0'

            });
            for (let i = 0; i < editItems.length; i++) {
                for (let j = 0; j < menu_clone.length; j++) {
                    if (menu_clone[j].item == editItems[i].item_name) {
                        menu_clone[j].count = editItems[i].count
                    }else{
                        
                    }
                }
            }
            setEditItems(menu_clone)
        } else {
            setEditStatus(false)
        }


    }, [props.editStatus, props.editData])


    return (
        <Box flex={1}>
            <Box flex={.4} bg='rgb(71,8,4)' alignItems='center' justifyContent='center' >
                <Image source={require('./../assets/images/logo.jpeg')} alt="Halt Logo" size='sm' />
            </Box>
            <Box flex={1.7}  >
                <Box flex={.5} flexDirection='row' justifyContent='space-around' alignItems='center' >
                    <Box width='40%' right='40%' left='15%'>

                        {editStatus ?
                            <Input onChangeText={text => setEditName(text)} value={editName} fontSize='md' placeholder='Customer Name' borderWidth={2} borderColor='rgb(71,8,4)' />


                            : <Input onChangeText={text => setName(text)} value={name} fontSize='md' placeholder='Customer Name' borderWidth={2} borderColor='rgb(71,8,4)' />
                        }


                    </Box>
                    <Box left='15%'>
                        <Button borderRadius={1000} height={height * 0.07} width={width * 0.18} color='white' bg='rgb(71,8,4)' onPress={() => onReset()}>Clear</Button>
                    </Box>
                    <Box left='15%'>
                        <Button borderRadius={1000} height={height * 0.07} width={width * 0.18} color='white' bg='rgb(71,8,4)' onPress={() => setShowModal(true)}>Item +</Button>
                    </Box>


                </Box>

                <Box flex={2} justifyContent='center' alignItems='center' borderBottomWidth={4} borderBottomColor='rgb(71,8,4)'>
                    <Box flexDirection='row' width='100%' justifyContent='space-around' alignItems='center' height={height * 0.03} bg='rgb(71,8,4)'>
                        <Text alignItems='center' color='white' fontSize='sm'> ITEMS </Text>
                        <Text alignItems='center' color='white' mr={width * .06} fontSize='sm'> PRICE </Text>
                        <Text alignItems='center' color='white' mr={width * .07} fontSize='sm'> OPERATION </Text>
                    </Box>

                 {
                     editStatus? 
                     <ScrollView width='100%' >
                     {
                         spinner ? <Box justifyContent="center" alignItems="center" ><Spinner size="lg" /></Box> :
                             editItems.map((item, index) => (
                                 <Box flexDirection='row' key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)'>
                                     <Box width='30%' alignItems='center' bg='red.100' >  <Text fontSize='md'  > {item.item}</Text></Box>
                                     <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box>
                                     {/* <Box width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box> */}
                                     <Box flexDirection='row' justifyContent='space-evenly' bg='red.100' width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>

                                         <Box><Button bg='rgb(71,8,4)' onPress={() => onDecrement(item, index)}> - </Button></Box>
                                         <Box><Text>{item.count}</Text></Box>
                                         <Box><Button bg='rgb(71,8,4)' onPress={() => onIncrement(item, index)}> + </Button></Box>

                                     </Box>
                                 </Box>
                             ))
                     }
                 </ScrollView>:
                     <ScrollView width='100%' >
                     {
                         spinner ? <Box justifyContent="center" alignItems="center" ><Spinner size="lg" /></Box> :
                             menu.map((item, index) => (
                                 <Box flexDirection='row' key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)'>
                                     <Box width='30%' alignItems='center' bg='red.100' >  <Text fontSize='md'  > {item.item}</Text></Box>
                                     <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box>
                                     {/* <Box width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>  {item.price}</Box> */}
                                     <Box flexDirection='row' justifyContent='space-evenly' bg='red.100' width='50%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1}>
                                     
                                     
                                    <Box><Button bg='rgb(71,8,4)' onPress={() => ondeleteItem(item, index)} > D </Button></Box>
                                    <Box><Button bg='rgb(71,8,4)' onPress={() => onDecrement(item, index)} > - </Button></Box>
                                    <Box><Text>{item.count}</Text></Box>
                                    <Box><Button bg='rgb(71,8,4)' onPress={() => onIncrement(item, index)}> + </Button></Box>

                                     </Box>
                                 </Box>
                             ))
                     }
                 </ScrollView>
                 }


                </Box>
            </Box>
            <Box flex={1} flexDirection='row'  >
                <Box flex={2}   >
                    <Center bg='rgb(71,8,4)' width='100%' height={height * 0.03} _text={{ color: 'white', fontWeight: 'bold' }} >SUMMARY</Center>
                    <Box flexDirection='row' width='100%' justifyContent='space-around' alignItems='center' height={height * 0.03} bg='rgb(71,8,4)' >
                        <Text alignItems='center' color='white' fontSize='xs' ml={width * .07}> ITEMS </Text>
                        <Text alignItems='center' color='white' fontSize='xs' ml={width * .12}> QUANTITY </Text>
                        <Text alignItems='center' color='white' fontSize='xs'> PRICE </Text>
                    </Box>
                    {editStatus ?
                        <ScrollView width='100%' >
                            {

                                editItems.map((item, index) => {

                                    if (item.count > 0) {



                                        return (

                                            <Box flexDirection='row' key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)' height={height * .04}>
                                                <Box width='50%' alignItems='center' bg='red.100' flexDirection='row' justifyContent='center' >  {item.item}</Box>
                                                <Box width='30%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1} flexDirection='row' justifyContent='center' >    {item.price} X {item.count}</Box>
                                                <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1} flexDirection='row' justifyContent='center' >  {getTotal(item.price * item.count)} </Box>

                                            </Box>
                                        )
                                    }
                                })
                            }
                        </ScrollView> :


                        <ScrollView width='100%' >
                            {

                                menu.map((item, index) => {

                                    if (item.count > 0) {



                                        return (

                                            <Box flexDirection='row' key={index} borderBottomWidth={1} borderBottomColor='rgb(71,8,4)' height={height * .04}>
                                                <Box width='50%' alignItems='center' bg='red.100' flexDirection='row' justifyContent='center' >  {item.item}</Box>
                                                <Box width='30%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1} flexDirection='row' justifyContent='center' >    {item.price} X {item.count}</Box>
                                                <Box width='20%' alignItems='center' borderLeftColor='rgb(71,8,4)' borderLeftWidth={1} flexDirection='row' justifyContent='center' >  {getTotal(item.price * item.count)} </Box>

                                            </Box>
                                        )
                                    }
                                })
                            }
                        </ScrollView>}

                </Box>
                <Box flex={1} borderLeftColor='rgb(71,8,4)' borderLeftWidth={2}>
                    <Box flex={1} alignItems='center'  >
                        <Center bg='rgb(71,8,4)' width='100%' height={height * 0.03}><Text fontSize='lg' fontWeight='extrabold' color='white' >TOTAL</Text></Center>
                        <Box w='100%' h='80%' justifyContent='center' alignItems='center'> <Heading size='2xl' color='rgb(71,8,4)' >{'₹ ' + total} </Heading></Box>

                    </Box>
                    <Box flex={1} borderTopColor='rgb(71,8,4)' borderTopWidth='2' >
                        {editStatus? 
                     <Button bg='rgb(71,8,4)' py='5' borderRadius={100} top='13%' onPress={onHandleUpdateOrder}>
                     <Heading size='xs' color='white' > {spinner1 ? <Spinner size="lg" /> : 'UPDATE ORDER'} </Heading>
                 </Button>
                 :    
                 <Button bg='rgb(71,8,4)' py='5' borderRadius={100} top='13%' onPress={onHandlePlaceOrder}>
                 <Heading size='xs' color='white' > {spinner1 ? <Spinner size="lg" /> : 'PLACE ORDER'} </Heading>
             </Button>
                    }
                        
                    </Box>
                </Box>
            </Box>

            <NewItemModal showModal={showModal} setShowModal={setShowModal} handleNewItem={handleNewItem} />


        </Box>


    );



}

export default Home;