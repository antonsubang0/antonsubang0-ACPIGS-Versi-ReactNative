import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import TextCs from '../../atom/text';
import bgCardCuti from '../../assets/bgcardcuti/bgcardcuti.png';
import Logoimg from '../../assets/logo/avatar.jpg';

const styles = StyleSheet.create({
  card: margin => ({
    marginHorizontal: margin,
    backgroundColor: '#fefefe',
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: 'center',
  }),
  bgimg: {
    padding: 10,
    borderRadius: 5,
  },
  headerCard: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  contentCard: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  img: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').width * 0.2 * 0.5,
    borderWidth: 3,
    borderColor: '#fff',
  },
  contentpage: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
});

export default function CardHomeCuti({data, margin, onPress}) {
  return (
    <View style={styles.card(margin)}>
      <ImageBackground
        source={bgCardCuti}
        resizeMode="stretch"
        style={styles.bgimg}>
        <View style={styles.headerCard}>
          <TextCs
            text={`${data.tgl_cuti}`}
            size={10}
            color={'#fff'}
            weight={'600'}
          />
        </View>
        <View style={styles.contentCard}>
          <Image
            source={
              data.photo_path === 'https://cpi-cloud.my.id'
                ? Logoimg
                : {uri: data.photo_path}
            }
            style={styles.img}
          />
          <View style={styles.contentpage}>
            <TextCs
              text={`${data.nama}`}
              size={14}
              color={'#fff'}
              weight={'600'}
            />
            <TextCs
              text={`${data.bnama}`}
              size={12}
              color={'#fff'}
              weight={'600'}
            />
            <TextCs
              text={`Cuti ke ${data.cuti_ke}`}
              size={12}
              color={'#fff'}
              weight={'600'}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
