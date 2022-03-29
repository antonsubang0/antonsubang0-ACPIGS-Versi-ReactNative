import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  txt: (size, weight, color, shadow) =>
    !shadow
      ? {
          fontSize: (size / 320) * Dimensions.get('window').width,
          fontWeight: weight,
          color: color,
          fontFamily: 'Poppins-Regular',
        }
      : {
          fontSize: (size / 320) * Dimensions.get('window').width,
          fontWeight: weight,
          color: color,
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: {width: -1, height: 1},
          textShadowRadius: 10,
          fontFamily: 'Poppins-Regular',
        },
});

export default function TextCs({text, size, weight, color, shadow}) {
  return (
    <Text
      style={styles.txt(size, weight, color, shadow)}
      allowFontScaling={false}
      ellipsizeMode={'tail'}
      numberOfLines={1}>
      {text}
    </Text>
  );
}
