import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../../assets/logo';
import ButtonMed from '../../atom/buttonMed';
import TextInputCs from '../../atom/textinput';
import {httpLupaPassword} from '../../http';
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
    marginTop: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Forgotx({navigation}) {
  const [lanjut, setLanjut] = React.useState(false);
  const [data, setData] = React.useState({email: ''});
  const onPress = async () => {
    setLanjut(false);
    const result = await httpLupaPassword(data.email);
    setLanjut(true);
    const message = result.messages;
    console.log(message);
    if (message.error) {
      Toast(message.error);
    } else if (message.status === 'failed') {
      Toast(message.msg);
    } else if (message.status === 'sukses') {
      Toast(message.msg);
      navigation.goBack();
    } else {
      Toast('Error.');
    }
  };
  React.useEffect(() => {
    validateEmail(data.email) ? setLanjut(true) : setLanjut(false);
  }, [data]);
  return (
    <View style={styles.page}>
      <View style={styles.logo}>
        <Logo dimensi={120} />
      </View>
      <TextInputCs
        width={0.8}
        placeholder="Masukkan email"
        secureTextEntry={false}
        onChangeText={val => setData({email: val})}
      />
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
