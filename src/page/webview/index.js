import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import StatusBar from '../../atom/statusbar';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Share from 'react-native-share';
import {downloadSakit} from '../../http';

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  pdf: {
    margin: 15,
    flex: 1,
    resizeMode: 'contain',
  },
  download: {
    position: 'absolute',
    top: 10,
    right: Dimensions.get('window').width / 2 - 22,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#66bbbb',
    borderRadius: 45,
    width: 44,
    height: 44,
    zIndex: 100,
  },
});

export default function WebViewcs({navigation, route}) {
  const {url} = route.params;
  const onBack = () => {
    navigation.goBack();
  };
  const onPress = async () => {
    const sakit = await downloadSakit(url);
    Share.open({
      title: String(sakit).split('/').pop(),
      subject: String(sakit).split('/').pop(),
      message: String(sakit).split('/').pop(),
      url: `file://${sakit}`,
      type: 'image/jpeg',
      failOnCancel: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <View style={styles.all}>
      <StatusBar onPress={onBack} type={'back'} text={'Image Sakit'} />
      <View style={styles.img}>
        <TouchableOpacity onPress={onPress} style={styles.download}>
          <Icon name="share-social-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <Image source={{uri: url}} style={styles.pdf} />
      </View>
    </View>
  );
}
