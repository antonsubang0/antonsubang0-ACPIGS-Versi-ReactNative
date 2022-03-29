import React from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  loadingview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#00000066',
    zIndex: 1,
  },
});

export default function LoadingComponent() {
  return (
    <View style={styles.loadingview}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
