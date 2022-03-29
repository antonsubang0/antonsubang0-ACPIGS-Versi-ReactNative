import AsyncStorage from '@react-native-async-storage/async-storage';

const getDataStorage = async kunci => {
  try {
    const value = await AsyncStorage.getItem(kunci);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return 'Error';
  }
};

const storeDataStorage = async (kunci, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(kunci, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('kunci');
    return true;
  } catch (e) {
    return false;
  }
};

const logoutRemoveToken = async (navigation, Toast) => {
  try {
    await AsyncStorage.removeItem('kunci');
    return navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  } catch (e) {
    return Toast('Logout Gagal');
  }
};

export {getDataStorage, storeDataStorage, logoutRemoveToken, removeToken};
