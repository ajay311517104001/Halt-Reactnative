import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, findNodeHandle } from 'react-native';
import { Box, Button, Text, Stack, Input, Icon } from 'native-base'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { RegisterUserQuery } from "../../api_configs/APIQueries"
import { RegisterUserVariables } from "../../api_configs/APIVariable"

import { AuthContext } from '../../components/context'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Register = ({ navigation, route }) => {

  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [prompt, setPromt]=useState('')
  const [confirmPassword,setConfirmPassword] =useState('')


  const { signup } = useContext(AuthContext)



  const handleOnRegister = async () => {
    
    if(password===confirmPassword){
      try {
        RegisterUserVariables.input.user_id = userName;
        RegisterUserVariables.input.password = password;
        const response = await fetch('http://192.168.1.2:9000/graphql', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
  
  
  
          },
          body: JSON.stringify({ query: RegisterUserQuery, variables: RegisterUserVariables }),
        });
  
        const result = await response.json()
  
        if (result.data.registerNewUser.userCreated) {
  
          signup(result.data.registerNewUser.token)
  
        } else {
          console.log("user already exists try login")
          setPromt(result.data.registerNewUser.message)
         
  
        }
  
      }
      catch (err) {
        console.log("error in signing up user", err)
  
      }
  
    }else{
      console.log(password===confirmPassword)
      setPromt('password mismatch')
    }

  

    

  }


 

  return (
    <Box flex={1} justifyContent="center"   alignItems="center">
     
      <Stack space={5}  alignItems="center"   pt="40%" pb="20%" pl="3%" pr="3%" borderRadius={5} borderColor="light.400" borderWidth={1}  >
        <Input
          w={width * 0.8}
          h={height * 0.05}
          InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={height * 0.03} ml="2" color="muted.400" />} placeholder="username" fontSize={height * 0.02} onChangeText={text => setUserName(text)} />
        <Input
          w={width * 0.8}
          h={height * 0.05}
          type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={height * 0.03} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" fontSize={height * 0.02} onChangeText={text => setPassword(text)} />
      <Input
          w={width * 0.8}
          h={height * 0.05}
          type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={height * 0.03} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="confirm password" fontSize={height * 0.02} onChangeText={text => setConfirmPassword(text)} />
      {prompt!=='' &&
 <Text color="red.600">{prompt}</Text>
      }
     
      </Stack>

  
     


      <Button onPress={handleOnRegister} mt={height * 0.05}>
        <Text fontSize={height * .02}>Register</Text>
      </Button>


    </Box>
  );
}

export default Register;