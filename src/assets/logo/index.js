import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import Logoimg from '../../assets/logo/logo.png';

const styles = StyleSheet.create({
  img: dimensi => ({
    width: (dimensi / 320) * Dimensions.get('window').width,
    height: (dimensi / 320) * Dimensions.get('window').width,
  }),
});

export default function Logo({dimensi}) {
  return <Image source={Logoimg} style={styles.img(dimensi)} />;
}
