import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextCs from '../../atom/text';

const styles = StyleSheet.create({
  card: margin => ({
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9fefa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: margin,
    marginTop: 10,
    marginBottom: 5,
  }),
});

export default function Cardsakit({data, margin}) {
  return (
    <View style={styles.card(margin)}>
      <TextCs text={`Anda telah pada tanggal : ${data.tgl_sakit}`} size={14} />
    </View>
  );
}
