import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import TextCs from '../text';

const styles = StyleSheet.create({
  parent: {
    width: 0.8 * Dimensions.get('window').width,
    marginBottom: 10,
  },
  parenta: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  child: {
    alignSelf: 'flex-end',
  },
});

export default function Link({text, onPress, type}) {
  if (type === 'login') {
    return (
      <View style={styles.parent}>
        <TouchableOpacity onPress={onPress} style={styles.child}>
          <TextCs text={text} size={14} weight="400" color="#888" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.parenta}>
      <TouchableOpacity onPress={onPress} style={styles}>
        <TextCs text={text} size={14} weight="400" color="#888" />
      </TouchableOpacity>
    </View>
  );
}
