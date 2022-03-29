import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../../assets/logo';
import ButtonMed from '../../atom/buttonMed';
import TextInputCs from '../../atom/textinput';
import {formData, httpGantiPassword} from '../../http';
import {Toast} from '../../toast';

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

export default function GantiPassword({navigation}) {
  const [data, setData] = React.useState({
    passwordLama: null,
    passwordBaru: null,
    passwordBaru1: null,
  });
  const [lanjut, setLanjut] = React.useState(false);
  const [dangerPasswordLama, setDangerPasswordLama] = React.useState(0);
  const [dangerPasswordBaru, setDangerPasswordBaru] = React.useState(0);
  const [dangerPasswordBaru1, setDangerPasswordBaru1] = React.useState(0);
  const onType = (type, val) => {
    if (type === 'passwordLama') {
      String(val).length > 7
        ? setDangerPasswordLama(0)
        : setDangerPasswordLama(1);
      setData(formData(data, 'passwordLama', val));
    }
    if (type === 'passwordBaru') {
      String(val).length > 7
        ? setDangerPasswordBaru(0)
        : setDangerPasswordBaru(1);
      setData(formData(data, 'passwordBaru', val));
    }
    if (type === 'passwordBaru1') {
      String(val) === data.passwordBaru
        ? setDangerPasswordBaru1(0)
        : setDangerPasswordBaru1(1);
      setData(formData(data, 'passwordBaru1', val));
    }
  };
  const onPress = async () => {
    setLanjut(false);
    const result = await httpGantiPassword(
      data.passwordLama,
      data.passwordBaru,
      data.passwordBaru1,
    );
    const message = result.messages;
    setLanjut(true);
    if (message.passwordLama) {
      setDangerPasswordLama(1);
      return Toast(message.passwordLama);
    }
    if (message.passwordBaru) {
      setDangerPasswordBaru(1);
      return Toast(message.passwordBaru);
    }
    if (message.passwordBaru1) {
      setDangerPasswordBaru1(1);
      return Toast(message.passwordBaru1);
    }
    if (message.error) {
      const field = String(message.error).split(' ')[0];
      field === 'Password'
        ? setDangerPasswordLama(1)
        : setDangerPasswordBaru(1) && setDangerPasswordBaru1(1);
      return Toast(message.error);
    }
    if (message.status === 'sukses') {
      navigation.replace('Sukses');
    }
  };
  React.useEffect(() => {
    if (
      data.passwordLama &&
      data.passwordBaru &&
      data.passwordBaru1 &&
      data.passwordLama.length > 7 &&
      data.passwordBaru.length > 7 &&
      data.passwordBaru === data.passwordBaru1
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
        placeholder="Password Lama"
        secureTextEntry={false}
        type="email"
        onChangeText={val => onType('passwordLama', val)}
        danger={dangerPasswordLama === 1 ? true : false}
      />
      <TextInputCs
        width={0.8}
        placeholder="Password Baru"
        secureTextEntry={true}
        onChangeText={val => onType('passwordBaru', val)}
        danger={dangerPasswordBaru === 1 ? true : false}
      />
      <TextInputCs
        width={0.8}
        placeholder="Konf. Password Baru"
        secureTextEntry={true}
        onChangeText={val => onType('passwordBaru1', val)}
        danger={dangerPasswordBaru1 === 1 ? true : false}
      />
      <View style={styles.login} />
      <ButtonMed
        text="Ganti Passowrd"
        backgroundColor="#66bb6a"
        onPress={onPress}
        disabled={!lanjut}
      />
    </View>
  );
}
