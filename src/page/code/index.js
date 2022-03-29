import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../../assets/logo';
import ButtonMed from '../../atom/buttonMed';
import TextInputCs from '../../atom/textinput';
import TextCs from '../../atom/text';
import {httpCode} from '../../http';
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
    marginTop: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Kode({navigation}) {
  const [code, setCode] = React.useState('');
  const [lanjut, setLanjut] = React.useState(false);
  const onPress = async () => {
    const result = await httpCode(code);
    const message = result.messages;
    if (message.error) {
      Toast(message.error);
    } else if (message.status === 'sukses') {
      Toast('Sukses, silahkan login kembali dengan email baru anda.');
      navigation.replace('Login');
    } else {
      Toast('Network Error');
    }
  };
  React.useEffect(() => {
    if (String(code).length > 5) {
      setLanjut(true);
    } else {
      setLanjut(false);
    }
  }, [code]);
  return (
    <View style={styles.page}>
      <View style={styles.logo}>
        <Logo dimensi={120} />
      </View>
      <TextInputCs
        width={0.8}
        placeholder="Masukkan Kode"
        secureTextEntry={false}
        onChangeText={val => setCode(val)}
      />
      <TextCs text={'Masukan kode yang telah dikirim lewat email.'} size={12} />
      <View style={styles.login} />
      <ButtonMed
        text="Lanjut"
        backgroundColor="#66bb6a"
        onPress={onPress}
        disabled={!lanjut}
      />
    </View>
  );
}
