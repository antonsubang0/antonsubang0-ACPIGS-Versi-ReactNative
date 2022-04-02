import React from 'react';
import {View, StyleSheet, LogBox} from 'react-native';
import {admobStart} from '../../admob';
import Logo from '../../assets/logo';
import TextCs from '../../atom/text';
import {httpProfile} from '../../http';
import {removeToken} from '../../storage';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default function Splash({navigation}) {
  const first = async () => {
    const result = await httpProfile();
    if (result === null) {
      return navigation.replace('Login');
    }
    const message = result.messages;
    if (message.error) {
      return navigation.replace('Login');
    }
    if (message.status === 'failed') {
      return navigation.replace('Login');
    }
    if (message.status === 'sukses') {
      if (message.msg.user.active !== 'active') {
        await removeToken();
        return navigation.replace('Login');
      } else if (
        message.msg.user.photo_path === null ||
        message.msg.user.photo_path === ''
      ) {
        return navigation.replace('Photo');
      } else {
        return navigation.replace('Hometabs');
      }
    }
  };
  LogBox.ignoreAllLogs();
  React.useEffect(() => {
    admobStart();
    first();
  });

  return (
    <View style={styles.page}>
      <Logo dimensi={150} />
      <TextCs text="Selamat Datang" size={18} weight="700" color="#000" />
    </View>
  );
}
