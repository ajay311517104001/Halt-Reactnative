import React, { useEffect, useState , useContext } from 'react';
import { Dimensions, findNodeHandle } from 'react-native';
import { Box, Button, Text, Stack, Input, Icon } from 'native-base'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import {RegisterUserQuery} from "../../api_configs/APIQueries"
import {RegisterUserVariables} from "../../api_configs/APIVariable"

import {AuthContext} from '../../components/context'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Register = ({ navigation, route }) => {

    const [show, setShow] = useState(false);
    const [userName,setUserName]= useState('')
    const [password,setPassword]= useState('')


    const {signup}= useContext(AuthContext)

   

    const handleOnRegister = async()=>{      
      // console.log(mutationUserVariable)
      try{ 
        RegisterUserVariables.input.user_id=userName;
        RegisterUserVariables.input.password=password;
         const response =   await fetch('http://192.168.1.2:9000/graphql', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                           'Content-Type': 'application/json',
                           'access-control-allow-origin': '*',
                
                 
               
                },
                body: JSON.stringify({query: RegisterUserQuery,variables:RegisterUserVariables}),
              });
    
          const result = await response.json()
          if(result.data.addNewUser.token){
            // storeUserToken()
                signup(result.data.addNewUser.token)
              
          }else{
            console.log("token is not received from the server for registration")
          }
          console.log("the result is ",result) 
         console.log("the result is ",result.data.addNewUser.token) }
         catch(err){
           console.log("error in signing up user",err)
      
         }
        

  // const response = await fetch('http://192.168.1.2:9000/graphql', {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'access-control-allow-origin': '*',

  //         },
  //         body: JSON.stringify({query: mutationQueryStrings}),
  //       });
  //       const result = await response.json()
  //         console.log("the result is ",result) 

// try{
//   fetch('http://192.168.1.2:9000/graphql', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'access-control-allow-origin': '*',

//     },
//     body: JSON.stringify({query: `
//     {
//       getallUsers{
//         userlist{
//            id
//         username
//         password
//         }
//        error
       
//       }
//     }`}),
//   }).then((res)=> console.log(res.json()))
// }catch(err){
//   console.log(err)
// }
 

      }
    

    //   useEffect(async()=>{
    //     fetch('http://localhost:9000/graphql', {
    //         method: 'POST',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'access-control-allow-origin': '*',
  
    //         },
    //         body: JSON.stringify({query: `
    //         {
    //           getallUsers{
    //             userlist{
    //                id
    //             username
    //             password
    //             }
    //            error
               
    //           }
    //         }`}),
    //       }).then((res)=> console.log(res.json()))

    //   },[])

    return (
        <Box flex={1} justifyContent="center" alignItems="center">

            <Stack space={4} w="90%" alignItems="center" height="80%" bg="red.100">
                <Input 
                w={width*0.8}
                h={height*0.05}
                 InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={height*0.03} ml="2" color="muted.400" />} placeholder="username" fontSize={height*0.02} onChangeText={text=>setUserName(text)}/>
                <Input 
                w={width*0.8}
                h={height*0.05}
                type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={height*0.03} mr="2" color="muted.400"   onPress={() => setShow(!show)} />} placeholder="Password"  fontSize={height*0.02} onChangeText={ text=>setPassword(text)}/>
            </Stack>


            <Button onPress={handleOnRegister}>
                <Text fontSize={height * .02}>Register</Text>
            </Button>


        </Box>
    );
}

export default Register;