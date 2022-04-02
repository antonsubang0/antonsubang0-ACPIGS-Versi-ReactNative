import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../../assets/logo';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function About() {
  return (
    <View style={styles.all}>
      <StatusBar type={'home'} text={'AGAPE'} />
      <View style={styles.page}>
        <Logo dimensi={150} />
        <TextCs text={'ACPIGS V9.0'} size={16} weight={'700'} color={'#000'} />
        <TextCs
          text={'Created By : LARTeams'}
          size={14}
          weight={'400'}
          color={'#000'}
        />
      </View>
    </View>
  );
}
