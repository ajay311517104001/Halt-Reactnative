
import React from 'react';
import { Dimensions ,View} from 'react-native';


import { Box, Input, VStack, Icon, Text } from 'native-base'


const { width, height } = Dimensions.get('window');

var items = [
    {
        id: 1,
        name: 'JavaScript',
    },
    {
        id: 2,
        name: 'Java',
    },
    {
        id: 3,
        name: 'Ruby',
    },
    {
        id: 4,
        name: 'React Native',
    },
    {
        id: 5,
        name: 'PHP',
    },
    {
        id: 6,
        name: 'Python',
    },
    {
        id: 7,
        name: 'Go',
    },
    {
        id: 8,
        name: 'Swift',
    },
];



const Profile = () => {


    return (
        <Box flex={1}  >
            <Box flex={1} bg='amber.100' alignItems='center'  >
                <VStack mt={height * .05} >
                    <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" InputLeftElement={<Icon ml="2" size="4" color="gray.400" />} />
                </VStack>
                <VStack bgColor="muted.200"style={{ position:'absolute', elevation: 1 }} mt={height*.1} >
                    {items.map((product, index) => (
                        <Text

                            p="1"
                            px="3"
                            noOfLines={1}
                            fontSize="sm"
                            key={index}>
                            search list  + {index}
                        </Text>
                    ))}
                </VStack>
            </Box>
            <Box flex={2} bg='blue.100' style={{ elevation:-1}}>
                   this is second one
            </Box>
        </Box>

      
    );
}

export default Profile;