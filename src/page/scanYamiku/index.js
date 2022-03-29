import React from 'react';
import {View, StyleSheet, Vibration, Alert, Dimensions} from 'react-native';
import LoadingComponent from '../../component/loading';
import {httpAmbilBarcode} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';
import {RNCamera} from 'react-native-camera';
import ButtonMed from '../../atom/buttonMed';
import StatusBar from '../../atom/statusbar';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  buttonBttm: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
});

export default function ScanYamiku({navigation}) {
  const [startAgain, setstartAgain] = React.useState(false);
  const [senter, setSenter] = React.useState(false);
  const barcodeReceived = async event => {
    const dataBarcode = event.barcodes[0].data;
    const typeBarcode = event.barcodes[0].type;
    if (typeBarcode !== 'QR_CODE') {
      return;
    }
    if (startAgain) {
      return;
    }
    setstartAgain(true);
    const result = await httpAmbilBarcode(dataBarcode);
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.error) {
      Vibration.vibrate();
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'failed') {
      Vibration.vibrate();
      return Alert.alert('Gagal', 'Jangan diperbolehkan ambil yamiku.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if (message.status === 'sukses') {
      // Vibration.vibrate();
      return Alert.alert(
        'Sukses',
        `Diperbolehkan ambil yamiku. \nNama : ${message.msg.nama} ( ${message.msg.bnama} ). \nPeriode Yamiku : ${message.msg.periode_jatah} `,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  };
  const onBack = () => {
    navigation.goBack();
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
        <RNCamera
          style={styles.page}
          onGoogleVisionBarcodesDetected={barcodeReceived}
          type={RNCamera.Constants.Type.back}
          flashMode={
            senter
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          captureAudio={false}>
          <StatusBar onPress={onBack} type={'back'} text={'Scan Yamiku'} />
          <View style={styles.buttonBttm}>
            <ButtonMed
              text={senter ? 'Senter OFF' : 'Senter ON'}
              backgroundColor={senter ? '#bbbb66' : '#66bbbb'}
              onPress={() => setSenter(!senter)}
            />
          </View>
        </RNCamera>
        // <QRCodeScanner
        //   onRead={barcodeReceived}
        //   flashMode={
        //     senter
        //       ? RNCamera.Constants.FlashMode.torch
        //       : RNCamera.Constants.FlashMode.off
        //   }
        //   topContent={
        //     <View style={styles.flex1}>
        //       <TextCs
        //         text={'PT. AGAPE Diah Persada'}
        //         size={14}
        //         weight={'700'}
        //       />
        //     </View>
        //   }
        //   bottomContent={
        //     <View style={styles.flex1}>
        //       <TextCs text={'Scan QRCode Yamiku'} size={14} weight={'600'} />
        //       <ButtonMed
        //         text={senter ? 'Senter OFF' : 'Senter ON'}
        //         backgroundColor={senter ? '#bbbb66' : '#66bbbb'}
        //         onPress={() => setSenter(!senter)}
        //       />
        //     </View>
        //   }
        // />
      )}
    </View>
  );
}
