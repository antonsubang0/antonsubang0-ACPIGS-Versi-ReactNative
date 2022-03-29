import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Logo from '../../assets/logo';
import TextCs from '../text';

const styles = StyleSheet.create({
  bar: {
    height: 75,
    backgroundColor: '#66bb6a',
    paddingTop: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  icontab: {
    marginRight: 10,
  },
});

export default function StatusBar({type, text, onPress}) {
  if (type === 'back') {
    return (
      <View style={styles.bar}>
        <TouchableOpacity style={styles.icontab} onPress={onPress}>
          <Icon
            name="ios-arrow-back"
            size={(30 / 320) * Dimensions.get('window').width}
            color="#fff"
          />
        </TouchableOpacity>
        <TextCs text={text} size={20} color={'#fff'} weight={'700'} />
      </View>
    );
  }
  if (type === 'home') {
    return (
      <View style={styles.bar}>
        <View style={styles.icontab}>
          <Logo dimensi={30} />
        </View>
        <TextCs text={text} size={20} color={'#fff'} weight={'700'} />
      </View>
    );
  }
}
