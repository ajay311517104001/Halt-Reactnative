import React, { useContext } from 'react';
import {Box, Button} from 'native-base'

import { AuthContext} from '../../components/context'



const Login = ({navigation}) => {


    const {signIn}= useContext(AuthContext)


    return (
        <Box flex={1} justifyContent="center" alignItems="center">
            LOGIN SCREEN
            <Button onPress={()=>{
                signIn()
            }}>Login</Button>


            <Button onPress={()=>{navigation.navigate('Register')}}>Go to Register</Button>
        </Box>
    );
}

export default Login;