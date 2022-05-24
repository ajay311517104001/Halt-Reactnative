import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserToken = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@user_object_Key', jsonValue);
  } catch (e) {

  }
};