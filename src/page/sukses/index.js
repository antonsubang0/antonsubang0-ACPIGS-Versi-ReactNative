import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Logo from '../../assets/logo';
import ButtonMed from '../../atom/buttonMed';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 25,
    position: 'absolute',
    top: 35,
    right: 10,
  },
  login: {
    marginTop: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default function Photo({navigation}) {
  const onPress = () => {
    navigation.replace('Hometabs');
  };
  return (
    <View style={styles.page}>
      <View style={styles.logo}>
        <Logo dimensi={70} />
      </View>
      <Icon
        name="checkmark-done-circle-outline"
        size={(130 / 320) * Dimensions.get('window').width}
        color="#000"
      />
      <View style={styles.login} />
      <ButtonMed text="Lanjut" backgroundColor="#66bb6a" onPress={onPress} />
    </View>
  );
}
