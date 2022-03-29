import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Route from './src/route';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="#ff00ff00"
        translucent={true}
      />
      <Route />
    </SafeAreaView>
  );
}
