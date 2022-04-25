import React, { useMemo, useState, useContext, useEffect, useReducer } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { Profile } from '../screens/index'
import { BottomTabs } from '../stacks/BottomTabs'
import Login from '../screens/EntryScreens/Login'
import Register from '../screens/EntryScreens/Register';
import { Button } from 'native-base';
import { AuthContext } from '../components/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeUserToken } from "../stores/AsyncStorage"



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();





const Rootstack = () => {


    const initialAuthState = {
        user_id: null,
        userToken: null,
    };

    const AuthReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    user_id: action.user_id
                }
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    user_id: action.user_id
                }
            case 'REGISTER':
                return {
                    ...prevState,
                    userToken: action.token,
                    user_id: action.user_id

                }
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    user_id: null
                }
        }

    }


    const [AuthState, dispatch] = useReducer(AuthReducer, initialAuthState)

    const authContext = useMemo(() => ({

        signIn: () => {
            setUserToken('ajay')
            console.log("im the sigin in clicked")
            setFlag(true)

        },
        signOut: () => {
            const remove = async () => {
                try {
                    await AsyncStorage.removeItem('@user_object_Key')
                        .then(() => dispatch({ type: 'LOGOUT' }))
                } catch (err) {
                    console.log("error in retriving token", err)
                }
            }

            remove()


        },
        signup: (token) => {
            storeUserToken(token)
            dispatch({ type: 'REGISTER', token: token })

        }
    }))

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => {
                    authContext.signOut()

                }

                } />
            </DrawerContentScrollView>
        );
    }

    useEffect(() => {
        const retrive = async () => {
            let token = null

            try {
                token = await AsyncStorage.getItem('@user_object_Key')
            } catch (err) {
                console.log("error in retriving token", err)
            }

            dispatch({ type: 'RETRIVE_TOKEN', token: token })
        }

        retrive();



    }, [])

    return (
        <AuthContext.Provider value={authContext} >
            <NavigationContainer>
                {AuthState.userToken !== null ?

                    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} drawerContent={props => <CustomDrawerContent {...props} />} >
                        <Drawer.Screen name="Home" component={BottomTabs} />
                        <Drawer.Screen name="Profile" component={Profile} />


                    </Drawer.Navigator>

                    :

                    <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }} >
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />

                    </Stack.Navigator>
                }



            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default Rootstack;