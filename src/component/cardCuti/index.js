import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import TextCs from '../../atom/text';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import bgCardCuti from '../../assets/bgcardcuti/bgcardcuti.png';

const styles = StyleSheet.create({
  card: margin => ({
    marginHorizontal: margin,
    backgroundColor: '#fefefe',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
    borderRadius: 5,
  }),
  bgimg: {
    padding: 10,
    borderRadius: 5,
  },
  headerCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentCard: {
    paddingTop: 5,
    flex: 1,
  },
  footerCard: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  iconcenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
});

export default function CardCuti({data, margin, onPress}) {
  return (
    <View style={styles.card(margin)}>
      <ImageBackground
        source={bgCardCuti}
        resizeMode="stretch"
        style={styles.bgimg}>
        <View style={styles.headerCard}>
          <TextCs
            text={`Cuti ke ${data.cuti_ke}`}
            size={10}
            color={'#fff'}
            weight={'600'}
          />
          <TextCs
            text={`${data.tgl_cuti}`}
            size={10}
            color={'#fff'}
            weight={'600'}
          />
        </View>
        <View style={styles.contentCard}>
          <TextCs
            text={`${data.keperluan}`}
            size={14}
            color={'#fff'}
            weight={'600'}
          />
        </View>
        <View style={styles.footerCard}>
          <TextCs
            text={`SPV : ${data.spv === '0' ? 'Belum' : 'Disetuji'}`}
            size={12}
            color={data.spv === '0' ? '#ea0313' : '#0313ea'}
            weight={'400'}
            shadow
          />
          <TextCs
            text={`Korlap : ${data.korlap === 0 ? 'Belum' : 'Disetuji'}`}
            size={12}
            color={data.korlap === '0' ? '#ea0313' : '#0313ea'}
            weight={'400'}
            shadow
          />
          <View style={styles.iconcenter}>
            <TouchableOpacity onPress={onPress}>
              <Icon
                name="ios-cloud-download-outline"
                size={(20 / 320) * Dimensions.get('window').width}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
