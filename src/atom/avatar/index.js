import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Logoimg from '../../assets/logo/avatar.jpg';

const styles = StyleSheet.create({
  btnMed: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  img: {
    width: (120 / 320) * Dimensions.get('window').width,
    height: (120 / 320) * Dimensions.get('window').width,
    borderRadius: (120 / 320) * Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
  icon: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: (40 / 320) * Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    height: (40 / 320) * Dimensions.get('window').width,
    paddingHorizontal: 3,
    borderRadius: (50 / 320) * Dimensions.get('window').width,
    right: (5 / 320) * Dimensions.get('window').width,
    bottom: (5 / 320) * Dimensions.get('window').width,
  },
});

export default function Avatar({onPress, logo}) {
  return (
    <TouchableOpacity style={styles.btnMed} onPress={onPress}>
      <Image source={logo ? {uri: logo} : Logoimg} style={styles.img} />
      <View style={styles.icon}>
        <Icon
          name="ios-reload-circle-outline"
          size={(35 / 320) * Dimensions.get('window').width}
          color="#000"
        />
      </View>
    </TouchableOpacity>
  );
}
