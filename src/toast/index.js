import {ToastAndroid} from 'react-native';

const Toast = message => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
};

export {Toast};
