import React from 'react';
import {View, StyleSheet, PermissionsAndroid, BackHandler} from 'react-native';
import Logo from '../../assets/logo';
import ButtonMed from '../../atom/buttonMed';
import Link from '../../atom/link';
import TextInputCs from '../../atom/textinput';
import {formData, httpLogin} from '../../http';
import {getDataStorage, storeDataStorage} from '../../storage';
import {Toast} from '../../toast';
import {validateEmail} from '../../util';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 25,
  },
  login: {
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Login({navigation}) {
  const [data, setData] = React.useState({
    email: null,
    password: null,
    imei: 1,
  });
  const [lanjut, setLanjut] = React.useState(false);
  const [lanjut1, setLanjut1] = React.useState(false);
  const [dangerEmail, setDangerEmail] = React.useState(0);
  const [dangerPassword, setDangerPassword] = React.useState(0);
  const onType = (type, val) => {
    if (type === 'email') {
      validateEmail(val) ? setDangerEmail(0) : setDangerEmail(1);
      setData(formData(data, 'email', val));
    }
    if (type === 'password') {
      String(val).length > 7 ? setDangerPassword(0) : setDangerPassword(1);
      setData(formData(data, 'password', val));
    }
  };
  const toForgot = () => {
    navigation.navigate('Forgot');
  };
  const onPress = async () => {
    setLanjut(false);
    setLanjut1(true);
    const result = await httpLogin(data.email, data.password, data.imei);
    const message = result.messages;
    setLanjut(true);
    setLanjut1(false);
    if (message.email) {
      setDangerEmail(1);
      return Toast(message.email);
    }
    if (message.password) {
      setDangerPassword(1);
      return Toast(message.password);
    }
    if (message.error) {
      const field = String(message.error).split(' ')[0];
      field === 'Password'
        ? setDangerPassword(1)
        : field === 'Email'
        ? setDangerEmail(1)
        : setDangerPassword(0);
      return Toast(message.error);
    }
    await storeDataStorage('kunci', message.msg);
    if (message.msg.active === 0) {
      return navigation.replace('Email');
    } else {
      return message.msg.photo_path === null || message.msg.photo_path === ''
        ? navigation.replace('Photo')
        : navigation.replace('Sukses');
    }
  };
  const requestStatePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Perijinan',
          message: 'Meminta perijinan untuk akses kamera di HP anda',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        BackHandler.exitApp();
      }
    } catch (err) {
      BackHandler.exitApp();
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Perijinan',
          message: 'Meminta perijinan untuk menulis file di HP anda',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        BackHandler.exitApp();
      }
    } catch (err) {
      BackHandler.exitApp();
    }
    const nomoracak = await getDataStorage('nomoracak');
    if (!nomoracak) {
      let acak = '';
      let array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      for (let index = 0; index < 15; index++) {
        acak += array[Math.round(Math.random() * 9)];
      }
      await storeDataStorage('nomoracak', acak);
    }
  };
  React.useEffect(() => {
    requestStatePermission();
  }, []);
  React.useEffect(() => {
    if (
      data.email &&
      data.password &&
      validateEmail(data.email) &&
      data.password !== '' &&
      data.password.length > 7
    ) {
      setLanjut(true);
    } else {
      setLanjut(false);
    }
  }, [data]);
  return (
    <View style={styles.page}>
      <View style={styles.logo}>
        <Logo dimensi={120} />
      </View>
      <TextInputCs
        width={0.8}
        placeholder="Email"
        secureTextEntry={false}
        type="email"
        onChangeText={val => onType('email', val)}
        danger={dangerEmail === 1 ? true : false}
        disabled={lanjut1}
      />
      <TextInputCs
        width={0.8}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={val => onType('password', val)}
        danger={dangerPassword === 1 ? true : false}
        disabled={lanjut1}
      />
      <View style={styles.login}>
        <Link text="Lupa Password ?" type={'login'} onPress={toForgot} />
      </View>
      <ButtonMed
        text="Login"
        backgroundColor="#66bb6a"
        onPress={onPress}
        disabled={!lanjut}
      />
    </View>
  );
}
