import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import imgGaji from './gaji.png';

const styles = StyleSheet.create({
  img: dimensi => ({
    width: (dimensi / 320) * Dimensions.get('window').width,
    height: (dimensi / 320) * Dimensions.get('window').width,
    marginLeft: 15,
    borderRadius: 5,
  }),
});

export default function LogoGaji({dimensi, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imgGaji} style={styles.img(dimensi)} />
    </TouchableOpacity>
  );
}
