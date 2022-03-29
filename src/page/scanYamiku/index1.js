import React from 'react';
import {View, StyleSheet, Vibration, Alert} from 'react-native';
import {QRScannerView} from 'react-native-qrcode-scanner-view';
import LoadingComponent from '../../component/loading';
import {httpAmbilBarcode} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default function ScanYamiku1({navigation}) {
  const [startAgain, setstartAgain] = React.useState(false);
  const barcodeReceived = async event => {
    if (startAgain) {
      return;
    }
    const result = await httpAmbilBarcode(event.data);
    console.log(result);
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      setstartAgain(true);
      Vibration.vibrate();
      return Alert.alert('Gagal', 'Jangan diperbolehkan ambil yamiku.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if (message.status === 'sukses') {
      setstartAgain(true);
      Vibration.vibrate();
      return Alert.alert('Sukses', 'Diperbolehkan ambil yamiku.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  React.useEffect(() => {
    if (startAgain) {
      setTimeout(() => {
        setstartAgain(false);
      }, 2000);
    }
  }, [startAgain]);

  return (
    <View style={styles.page}>
      {startAgain ? (
        <LoadingComponent />
      ) : (
        <QRScannerView
          onScanResult={barcodeReceived}
          scanBarAnimateReverse={true}
        />
      )}
    </View>
  );
}
