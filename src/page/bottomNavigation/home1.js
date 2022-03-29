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
import CardCuti from '../../component/cardCuti';
import Link from '../../atom/link';
import Cardijin from '../../component/cardIjin';
import Cardsakit from '../../component/cardSakit';
import {httpProfile} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';
import LoadingComponent from '../../component/loading';

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  info: {
    width: Dimensions.get('window').width,
    height: (121 / 375) * Dimensions.get('window').width,
    backgroundColor: '#F1F1F1',
    padding: 15,
    flexDirection: 'row',
  },
  photo: {
    width: (121 / 375) * Dimensions.get('window').width - 30,
    height: (121 / 375) * Dimensions.get('window').width - 30,
    borderRadius: ((121 / 375) * Dimensions.get('window').width) / 2,
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
});

export default function HomeBackup({route, navigation}) {
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
  React.useEffect(() => {
    first();
  }, []);
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
      <StatusBar onPress={onBack} type={'home'} text={'AGAPE'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <View style={styles.page}>
            <View style={styles.info}>
              <Image
                source={{uri: user.user.photo_path}}
                style={styles.photo}
              />
              <View style={styles.infotxt}>
                <TextCs text={user.user.nama} size={16} weight={'700'} />
                <TextCs text={user.user.uid} size={14} />
                <TextCs text={user.user.bnama} size={14} />
              </View>
              <TouchableOpacity style={styles.forward} onPress={toProfile}>
                <Icon
                  name="chevron-forward"
                  size={(85 / 375) * Dimensions.get('window').width}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.itemcontent}>
              <View>
                <TextCs text={'Daftar Cuti'} size={18} weight={'700'} />
                <View>
                  {user.cuti.map((cuti, index) => (
                    <CardCuti data={cuti} key={index} margin={0} />
                  ))}
                </View>
                <Link text={'More >>'} type={'home'} onPress={toCuti} />
              </View>
              <View>
                <TextCs text={'Daftar Sakit'} size={18} weight={'700'} />
                <View>
                  {user.sakit.map((sakit, index) => (
                    <Cardsakit data={sakit} margin={0} key={index} />
                  ))}
                </View>
                <Link text={'More >>'} type={'home'} onPress={toSakit} />
              </View>
              <View>
                <TextCs text={'Daftar Ijin'} size={18} weight={'700'} />
                <View>
                  {user.ijin.map((ijin, index) => (
                    <Cardijin data={ijin} key={index} />
                  ))}
                </View>
                <Link text={'More >>'} type={'home'} onPress={toIjin} />
              </View>
              <View>
                <TextCs text={'Daftar Gaji'} size={18} weight={'700'} />
                <View>
                  {user.gaji.map((gaji, index) => (
                    <View style={styles.mrgnTop} key={index}>
                      <TextCs
                        text={`Periode : ${gaji.periode} - ${gaji.gaji}`}
                        size={14}
                      />
                    </View>
                  ))}
                </View>
                <Link text={'More >>'} type={'home'} onPress={toGaji} />
              </View>
            </View>
          </View>
        ) : (
          <LoadingComponent />
        )}
      </ScrollView>
    </View>
  );
}
