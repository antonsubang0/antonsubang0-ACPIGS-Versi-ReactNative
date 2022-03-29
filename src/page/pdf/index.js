import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import StatusBar from '../../atom/statusbar';
import {Pdf} from 'react-native-pdf-light';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Share from 'react-native-share';

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0.05 * Dimensions.get('window').height,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
  },
  download: {
    position: 'absolute',
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#66bbbb',
    borderRadius: 45,
    width: 43,
    height: 43,
  },
});

export default function PdfViewer({route, navigation}) {
  const {url} = route.params;
  const onBack = () => {
    navigation.goBack();
  };

  const onPress = () => {
    Share.open({
      title: String(url).split('/').pop(),
      subject: String(url).split('/').pop(),
      message: String(url).split('/').pop(),
      url: `file://${url}`,
      type: 'application/pdf',
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
      <StatusBar onPress={onBack} type={'back'} text={'PDF Viewer'} />
      <View style={styles.page}>
        <Pdf source={url} />
        <TouchableOpacity onPress={onPress} style={styles.download}>
          <Icon name="share-social-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
