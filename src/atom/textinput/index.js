import React from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  input: (width, danger) => ({
    height: 43,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: width * Dimensions.get('window').width,
    borderColor: danger ? '#cc1133' : '#ddd',
    fontSize: (16 / 320) * Dimensions.get('window').width,
    backgroundColor: '#efefef',
    fontFamily: 'Poppins-Regular',
  }),
});
export default function TextInputCs({
  width,
  onChangeText,
  text,
  placeholder,
  secureTextEntry,
  danger,
  disabled,
}) {
  return (
    <TextInput
      style={styles.input(width, danger)}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={text}
      secureTextEntry={secureTextEntry}
      autoComplete="off"
      editable={!disabled}
      allowFontScaling={false}
    />
  );
}
