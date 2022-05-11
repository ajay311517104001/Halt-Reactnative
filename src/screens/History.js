import React from 'react';
import {Box,Image} from 'native-base'
const History = () => {


    return (
        <Box flex={1}>
        <Box  flex={.11} bg='rgb(71,8,4)' alignItems='center' justifyContent='center'>
        <Image source={require('./../assets/images/logo.jpeg')} alt='logo'/>
        </Box>
        <Box flex={1} bg='green.100' justifyContent='center' alignItems='center'>
           

                show history

        </Box>
     
        
    </Box>
      
    );
}

export default History;