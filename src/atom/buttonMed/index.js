import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextCs from '../text';

const styles = StyleSheet.create({
  btnMed: (backgroundColor, disabled) => ({
    padding: 10,
    backgroundColor: disabled ? '#dedede' : backgroundColor,
    marginBottom: 10,
    borderRadius: 5,
    width: 0.8 * Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});

export default function ButtonMed({text, onPress, disabled, backgroundColor}) {
  if (disabled) {
    return (
      <View style={styles.btnMed(backgroundColor, disabled)}>
        <TextCs text={text} size={16} color="#fff" weight="700" />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={styles.btnMed(backgroundColor, disabled)}
      onPress={onPress}>
      <TextCs text={text} size={16} color="#fff" weight="700" />
    </TouchableOpacity>
  );
}
