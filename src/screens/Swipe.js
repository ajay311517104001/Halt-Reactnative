import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';
import {Box,Image,Button,Center,Modal,ScrollView,Checkbox} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const { width, height } = Dimensions.get('window');

 const SwipeGesture = (props) =>{
    const {orders}=props
    const [showModal, setShowModal] = useState(false);
    const [viewItem,setViewItem]=useState({})

    // const [listData, setListData] = useState(props.orders)
    
    // console.log("the props for swipegesture is ===========>",listData)
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, item) => {
        closeRow(rowMap, item);


        // const newData = [...listData];
        // const prevIndex = listData.findIndex(item => item.key === rowKey);
        // newData.splice(prevIndex, 1);
        // setListData(newData);
    };

    const onRowDidOpen = () => {
        console.log('This row opened');
    };


    const onViewItems =(data)=>{
        setViewItem(data.item)
        
        setShowModal(true)
    }

    const renderItem = data => (
                <Box bg='red.100'
                    onPress={() => console.log('You touched me')}
                    style={styles.rowFront} flexDirection='row'
                 key={data.index}
                >
         

                      <Box width='25%' alignItems='center' _text={{ fontSize:'sm', fontWeight:'bold'}} flexDirection='row'  justifyContent='space-around' >
   
                      <Checkbox value="test" accessibilityLabel="This is a dummy checkbox"  colorScheme='rgb(71,8,4)' size='md' left='8%'/>
                              <Box flexDirection='row' _text={{ fontSize:'sm', fontWeight:'bold'}} h='100%' flex={1}  justifyContent='center' alignItems='center' > {data.item.name}</Box> </Box>
                            <Box width='25%' alignItems='center' flexDirection='row' justifyContent='center'><Button bg='rgb(71,8,4)' onPress={()=>onViewItems(data)} size='xs' >View Order</Button></Box>
                            <Box width='25%' alignItems='center' _text={{ fontSize:'sm'}} flexDirection='row' justifyContent='center'>{data.item.total + ' Rs'} </Box>
                            <Box width='25%' alignItems='center' flexDirection='row' justifyContent='space-evenly' marginLeft='2%'>
                            <MaterialCommunityIcons name="location-exit" color={'green'} size={30}  onPress={()=> props.onExitFromFlow(data.item)}/>
                            </Box>
                </Box>
            );
   

    const renderHiddenItem = (data, rowMap) => (
        <Box height='87%'  key={rowMap}>
         
           
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={()=> props.onEditDataFromFlow(data.item)}
            >
                            <MaterialCommunityIcons name="square-edit-outline" color='white' size={30}  />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => props.onCancelFromFlow(data.item)}
            >
                            <MaterialCommunityIcons name="close-circle-outline" color='white' size={30}  />
            </TouchableOpacity>
        </Box>
    );

    return (
        <Box style={styles.container}>
  <Box flex={.11} bg='rgb(71,8,4)' alignItems='center' justifyContent='center' >
                <Image source={require('./../assets/images/logo.jpeg')} alt='logo' size='sm' />
            </Box>
          
                <Box h={height * 0.03} width='95%' mt='1%' flexDirection='row' alignItems='center' bg='rgb(71,8,4)' ml={height *0.014} >
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}>Name</Box>
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}> Items</Box>
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}>Total</Box>
                    <Box width='25%' alignItems='center' _text={{ color: "white" }}>Payment Status</Box>
               
                </Box>
            <Box flex={1} top='2%'>
            <SwipeListView
                data={props.orders}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={0.5}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
                </Box>
                <Center>

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header bg='rgb(71,8,4)' height={height *0.06} _text={{color:'white'}} >  {viewItem.name} </Modal.Header>
        <Modal.Body height={height *0.15} bg='red.100'>
            <ScrollView>
           {
                (viewItem.items? viewItem.items : []).map((item, index) => 
                    (
                        
                        <Box  width='95%' mt='2%' ml='5%' key={index} flexDirection='row' alignItems='center'    _text={{ fontSize:'lg'}
                        
                        }    >

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {

        borderColor: 'white',
        borderBottomWidth: 10,
        borderLeftWidth:5,
        borderRightWidth:5,
        height: 70,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red.100',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
 
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        borderWidth:3,
        borderColor:'white',
        backgroundColor: 'rgb(71,8,4)',
        right: 75,

    },
    backRightBtnRight: {
        borderWidth:3,
        borderColor:'white',
        backgroundColor: 'rgb(71,8,4)',
        right: 0,

    },
});


export default SwipeGesture;