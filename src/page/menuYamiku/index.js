import React from 'react';
import {View, StyleSheet} from 'react-native';
import ButtonMed from '../../atom/buttonMed';
import StatusBar from '../../atom/statusbar';

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MenuYamiku({navigation}) {
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.all}>
      <StatusBar onPress={onBack} type={'back'} text={'Menu Yamiku'} />
      <View style={styles.page}>
        <ButtonMed
          text="Lihat Daftar Yamiku"
          backgroundColor="#6a66bb"
          onPress={() => {
            navigation.navigate('DaftarYamiku');
          }}
        />
        <ButtonMed
          text="Scan Yamiku"
          backgroundColor="#66bbbb"
          onPress={() => {
            navigation.navigate('ScanYamiku');
          }}
        />
      </View>
    </View>
  );
}
