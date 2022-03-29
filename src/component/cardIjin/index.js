import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import TextCs from '../../atom/text';
import bgCardCuti from '../../assets/bgcardcuti/bgcardijin.png';

const styles = StyleSheet.create({
  card: margin => ({
    backgroundColor: '#f1fcf8',
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
    borderRadius: 5,
  }),
  right: {
    alignSelf: 'flex-end',
  },
  bgimg: {
    padding: 10,
    borderRadius: 5,
  },
});

export default function Cardijin({data, margin}) {
  return (
    <View style={styles.card(margin)}>
      <ImageBackground
        source={bgCardCuti}
        resizeMode="stretch"
        style={styles.bgimg}>
        <View style={styles.right}>
          <TextCs
            text={`${data.tanggal}`}
            size={10}
            color={'#fff'}
            weight={'600'}
          />
        </View>
        <TextCs text={`${data.ijin}`} size={14} color={'#fff'} weight={'600'} />
        <View>
          <TextCs
            text={`Mengetahui : ${data.atasan ? data.atasan : 'Belum tahu'}`}
            size={12}
            color={'#fff'}
            weight={'600'}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
