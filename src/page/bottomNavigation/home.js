import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {downloadPdf, httpProfile} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';
import LoadingComponent from '../../component/loading';
import LogoCuti from '../../assets/cuti';
import LogoSakit from '../../assets/sakit';
import LogoGaji from '../../assets/gaji';
import LogoIjin from '../../assets/ijin';
import {BarChart} from 'react-native-chart-kit';
import LogoYamiku from '../../assets/yamiku';
import CardHomeCuti from '../../component/cardHomeCuti';
import {useFocusEffect} from '@react-navigation/native';
import Logoimg from '../../assets/logo/avatar.jpg';

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  infoparent: {
    paddingHorizontal: 15,
    position: 'relative',
    backgroundColor: '#66bb6a',
    height: (70 / 325) * Dimensions.get('window').width,
    paddingTop: (15 / 325) * Dimensions.get('window').width,
    marginBottom: (50 / 325) * Dimensions.get('window').width,
  },
  info: {
    width: '100%',
    backgroundColor: '#525252',
    padding: 15,
    flexDirection: 'row',
    borderRadius: 5,
  },
  photo: {
    width: (121 / 375) * Dimensions.get('window').width - 30,
    height: (121 / 375) * Dimensions.get('window').width - 30,
    borderRadius: ((121 / 375) * Dimensions.get('window').width) / 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  infotxt: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    flex: 1,
  },
  forward: {
    justifyContent: 'center',
    marginRight: -15,
  },
  itemcontent: {
    padding: 15,
  },
  judulMenu: {
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  itemMenu: {
    flexDirection: 'row',
    paddingEnd: 15,
  },
  mychart: {
    backgroundColor: '#525252',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Home({route, navigation}) {
  const [user, setUser] = React.useState(null);
  const first = async () => {
    const result = await httpProfile();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setUser(message.msg);
    }
  };

  const download = async url => {
    const result = await downloadPdf(url);
    if (result === 'Gagal') {
      Toast('Gagal Mengunduh');
    } else {
      Toast('Behasil Mengunduh : ' + result);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      first();

      return () => first();
    }, []),
  );
  const onBack = () => {
    navigation.goBack();
  };
  const toProfile = () => {
    navigation.navigate('Profile');
  };
  const toCuti = () => {
    navigation.navigate('Cuti');
  };
  const toSakit = () => {
    navigation.navigate('Sakit');
  };
  const toIjin = () => {
    navigation.navigate('Ijin');
  };
  const toGaji = () => {
    navigation.navigate('Gaji');
  };
  return (
    <View style={styles.all}>
      {user ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar onPress={onBack} type={'home'} text={'AGAPE'} />
          <View style={styles.page}>
            <View style={styles.infoparent}>
              <View style={styles.info}>
                <Image
                  source={
                    user.user.photo_path == null
                      ? Logoimg
                      : {uri: user.user.photo_path}
                  }
                  style={styles.photo}
                />
                <View style={styles.infotxt}>
                  <TextCs
                    text={user.user.nama}
                    size={18}
                    weight={'700'}
                    color={'#fff'}
                  />
                  <TextCs text={user.user.uid} size={14} color={'#fff'} />
                  <TextCs text={user.user.bnama} size={14} color={'#fff'} />
                </View>
                <TouchableOpacity style={styles.forward} onPress={toProfile}>
                  <Icon
                    name="chevron-forward"
                    size={(85 / 375) * Dimensions.get('window').width}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.judulMenu}>
              <TextCs
                text={'Satistik Anda'}
                size={18}
                weight={'700'}
                color={'#000'}
              />
            </View>
            <View style={styles.mychart}>
              <BarChart
                data={{
                  labels: ['Cuti', 'Sakit', 'Ijin'],
                  datasets: [
                    {
                      data: [user.ccuti, user.csakit, user.cijin],
                    },
                  ],
                }}
                width={Dimensions.get('window').width * 0.8}
                height={256}
                yAxisSuffix="X"
                verticalLabelRotation={30}
                chartConfig={{
                  backgroundGradientFrom: '#525252',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: '#525252',
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 2,
                  decimalPlaces: 0,
                  useShadowColorFromDataset: false,
                }}
                bezier
              />
            </View>
            <View>
              <View style={styles.judulMenu}>
                <TextCs text={'Menu'} size={18} weight={'700'} color={'#000'} />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.itemMenu}>
                  {user.user.bnama === 'Vaksin' ? (
                    <View />
                  ) : (
                    <LogoCuti dimensi={110} onPress={toCuti} />
                  )}
                  <LogoSakit dimensi={110} onPress={toSakit} />
                  <LogoIjin dimensi={110} onPress={toIjin} />
                  <LogoGaji dimensi={110} onPress={toGaji} />
                  {user.user.bnama === 'Security' ||
                  user.user.bnama === 'Gudang' ||
                  user.user.bnama === 'KORLAP' ? (
                    <LogoYamiku
                      dimensi={110}
                      onPress={() => navigation.navigate('MenuYamiku')}
                    />
                  ) : null}
                </View>
              </ScrollView>
              <View style={styles.itemcontent}>
                <TextCs
                  text={'Cuti Terakhir'}
                  size={18}
                  weight={'700'}
                  color={'#000'}
                />
                <View>
                  {user.cuti.map((cuti, index) => (
                    <CardHomeCuti
                      data={cuti}
                      key={index}
                      margin={0}
                      onPress={() => download(cuti.url)}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingComponent />
      )}
    </View>
  );
}
