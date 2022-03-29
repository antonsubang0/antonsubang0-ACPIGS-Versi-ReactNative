import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import imgSakit from './sakit.png';

const styles = StyleSheet.create({
  img: dimensi => ({
    width: (dimensi / 320) * Dimensions.get('window').width,
    height: (dimensi / 320) * Dimensions.get('window').width,
    marginLeft: 15,
    borderRadius: 5,
  }),
});

export default function LogoSakit({dimensi, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imgSakit} style={styles.img(dimensi)} />
    </TouchableOpacity>
  );
}
