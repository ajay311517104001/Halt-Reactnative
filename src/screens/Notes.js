import React, { useEffect, useState } from 'react';
import { Dimensions, } from 'react-native';
import { Box, Image, Text, Center, Button,Modal, ScrollView , TextArea} from 'native-base'
import { getIncomingOrderQuery } from '../api_configs/APIQueries'
import {URL} from '../api_configs/APIProxy'
const { width, height } = Dimensions.get('window');
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notes = (props) => {

    const defDate =new Date().toISOString().split('T')[0]
    const [trigger,setTrigger]=useState(0)
    const [defaultDate, setDefaultDate]=useState(defDate);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [msg,setmsg]=useState('');
    const [changedDate,setChangeDate]=useState(defDate);
    const demoValueControlledTextArea = e => {
      setTextAreaValue(e.currentTarget.value);
    };


    useEffect(()=>{


     const fun = async()=>{
        try {
            if(await AsyncStorage.getItem(defaultDate)){
                const msg =await AsyncStorage.getItem(defaultDate)
                    setmsg(msg)
            }
        
          } catch (e) {
            console.log('err getting from the async storage',e)
          }
     }

     fun()
      
    }
       
    ,[])
    




     
         const onDateChange = async(date)=>{
            try {
                if(await AsyncStorage.getItem(date)){
                    const msg =await AsyncStorage.getItem(date)
                    setmsg(msg)
                }else{
                  setmsg('')
                }
            
              } catch (e) {
                console.log('err getting from the async storage',e)
              }
         }
    

          
        const onNotesChange =(text)=>{
         setmsg(text)
    

        }
           
        const fun = async()=>{
            console.log("on edit end triggres",changedDate)
                 try {
            // if(await AsyncStorage.getItem(changedDate)){
            //     console.log("the key is present")
                await AsyncStorage.setItem(changedDate, msg)
             

            // }
          } catch (e) {
            console.log('err getting on notes change fun from the async storage',e)
          }
        }
  
    return (
        <Box flex={1} >
              <Box flex={.17} bg='rgb(71,8,4)' alignItems='center' justifyContent='center' >
                <Image source={require('./../assets/images/logo.jpeg')} alt='logo' size='sm' />
            </Box>
               <Calendar
            minDate={'2022-05-21'}
             maxDate={String(new Date().toISOString().split('T')[0])}
            // maxDate={'2022-05-31'}
            current={String(new Date())}
            // current={'2022-05-22T00:00:00.000Z'}
            markedDates={{
              [defaultDate]: {selected: true},
            }}
            onDayPress={day => {
            //   setDate(new Date(day.timestamp));
               setDefaultDate(day.dateString);
            setChangeDate(String(new Date(day.timestamp).toISOString().split('T')[0]))
            onDateChange(String(new Date(day.timestamp).toISOString().split('T')[0]))
             
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: 'rgb(71,8,4)',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: 'rgb(71,8,4)',
              selectedDayTextColor: '#ffffff',
              todayTextColor: 'rgb(71,8,4)',
              dayTextColor: 'rgb(71,8,4)',
              textDisabledColor: '#d9e1e8',
              arrowColor: 'rgb(71,8,4)',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'rgb(71,8,4)',
              indicatorColor: 'rgb(71,8,4)',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          <Box  flex={1}  bg='red.100' alignItems='center' justifyContent='center'  borderTopWidth={5} borderTopColor='rgb(71,8,4)'> 
          <Center _text={{ fontSize:'lg' , fontWeight:'bold'}}>Notes</Center>
          <TextArea placeholder=" Track your expenses "  borderWidth={1}  borderColor='rgb(71,8,4)' numberOfLines={1000} bg='white' onChangeText={text => onNotesChange(text)} value={msg} onChange={demoValueControlledTextArea} w="85%" h="65%"/>   
          <Button onPress={fun} bg='rgb(71,8,4)' top='2%'>SAVE</Button>
          {/* <Button onPress={async()=>{
    await AsyncStorage.clear();
}}> clear</Button> */}
          </Box>
        </Box>
    );
}

export default Notes;