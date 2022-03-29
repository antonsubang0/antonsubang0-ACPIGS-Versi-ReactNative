import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {httpSakit} from '../../http';
import {Toast} from '../../toast';
import {logoutRemoveToken} from '../../storage';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  pageContent: {
    flex: 1,
    paddingVertical: 10,
  },
  card: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
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
  },
  right: {
    alignSelf: 'flex-end',
  },
  img: {
    width: (70 / 320) * Dimensions.get('window').width,
    height: (70 / 320) * Dimensions.get('window').width,
    borderRadius: 3,
  },
  contentCard: {
    flexDirection: 'row',
  },
  iconcenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  gapBtm: {
    height: 30,
  },
  noFo: {
    marginHorizontal: 20,
  },
});

export default function Sakit({navigation}) {
  const [sakit, setSakit] = React.useState(null);
  const first = async () => {
    const result = await httpSakit();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setSakit(message.msg);
    }
  };
  React.useEffect(() => {
    first();
  }, []);
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.page}>
      <StatusBar onPress={onBack} type={'back'} text={'Daftar Sakit'} />
      <ScrollView style={styles.pageContent}>
        {sakit && sakit.length > 0 ? (
          sakit.map((data, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.right}>
                <TextCs
                  text={`${data.tgl_sakit}`}
                  size={10}
                  color={'#ccc'}
                  weight={'600'}
                />
              </View>
              <View style={styles.contentCard}>
                <Image style={styles.img} source={{uri: data.upload}} />
                <View style={styles.iconcenter}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WebView', {url: data.upload})
                    }>
                    <Icon
                      name="eye-outline"
                      size={(50 / 320) * Dimensions.get('window').width}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noFo}>
            <TextCs text={'Kosong.'} size={14} color={'#000'} />
          </View>
        )}
        <View style={styles.gapBtm} />
      </ScrollView>
    </View>
  );
}
