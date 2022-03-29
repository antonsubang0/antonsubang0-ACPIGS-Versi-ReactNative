import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Avatar from '../../atom/avatar';
import ButtonMed from '../../atom/buttonMed';
import TextCs from '../../atom/text';
import QRCode from 'react-native-qrcode-svg';
import ImagePicker from 'react-native-image-crop-picker';
import StatusBar from '../../atom/statusbar';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';
import {httpBarcode, httpGantiPhoto} from '../../http';
import LoadingComponent from '../../component/loading';
import Logo from '../../assets/logo';
import RBSheet from 'react-native-raw-bottom-sheet';
import Link from '../../atom/link';

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  login: {
    marginTop: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15,
  },
  qrcode: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    marginBottom: 10,
  },
});

export default function Profile({navigation, route}) {
  const refRBSheet = React.useRef();
  const [user, setUser] = useState(null);
  const first = async () => {
    const result = await httpBarcode();
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
  const onPress = async () => {
    logoutRemoveToken(navigation, Toast);
  };
  const onBack = () => {
    navigation.goBack();
  };
  const toPassword = () => {
    navigation.navigate('GantiPassword');
  };
  const onChoose = () => {
    refRBSheet.current.open();
  };
  const onPick = () => {
    refRBSheet.current.close();
    ImagePicker.openPicker({
      compressImageMaxHeight: 500,
      compressImageMaxWidth: 500,
      compressImageQuality: 0.7,
      mediaType: 'photo',
    })
      .then(async ress => {
        ImagePicker.openCropper({
          path: ress.path,
          width: 300,
          height: 300,
          compressImageMaxHeight: 300,
          compressImageMaxWidth: 300,
          includeBase64: true,
        })
          .then(async image => {
            const result = await httpGantiPhoto(image.data);
            // console.log(result);
            setUser(xxxx => ({
              ...xxxx,
              photo_path: `data:${ress.mime};base64, ${ress.data}`,
            }));
            const message = result.messages;
            if (message.status === 'sukses') {
              return Toast(message.status);
            }
            if (message.error) {
              return Toast(message.error);
            }
            if (message.upload) {
              return Toast(message.upload);
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  const onCamera = () => {
    refRBSheet.current.close();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      compressImageMaxHeight: 500,
      compressImageMaxWidth: 500,
      compressImageQuality: 0.7,
      mediaType: 'photo',
    })
      .then(async ress => {
        ImagePicker.openCropper({
          path: ress.path,
          width: 300,
          height: 300,
          compressImageMaxHeight: 300,
          compressImageMaxWidth: 300,
          includeBase64: true,
        })
          .then(async image => {
            const result = await httpGantiPhoto(image.data);
            // console.log(result);
            setUser(xxxx => ({
              ...xxxx,
              photo_path: `data:${ress.mime};base64, ${ress.data}`,
            }));
            console.log(user.photo_path);
            const message = result.messages;
            if (message.status === 'sukses') {
              return Toast(message.status);
            }
            if (message.error) {
              return Toast(message.error);
            }
            if (message.upload) {
              return Toast(message.upload);
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  React.useEffect(() => {
    first();
    let a = 0;
    const akux = setInterval(() => {
      first();
      console.log('barcode ' + a++);
    }, 5000);
    return () => clearInterval(akux);
  }, []);
  return (
    <View style={styles.all}>
      <StatusBar onPress={onBack} type={'back'} text={'Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <View style={styles.page}>
            <View style={styles.qrcode}>
              {user.barcode ? (
                <QRCode
                  value={user.barcode}
                  size={Math.floor(
                    (150 / 320) * Dimensions.get('window').width,
                  )}
                />
              ) : (
                <Logo dimensi={150} />
              )}
            </View>
            <Avatar
              logo={
                user.photo_path === 'https://cpi-cloud.my.id'
                  ? null
                  : user.photo_path
              }
              onPress={onChoose}
            />
            <View style={styles.info}>
              <TextCs
                text={user.nama}
                size={18}
                weight={'700'}
                color={'#000'}
              />
              <TextCs text={user.uid} size={18} weight={'700'} color={'#000'} />
              <TextCs
                text={user.bnama}
                size={18}
                weight={'700'}
                color={'#000'}
              />
            </View>
            <View style={styles.login}>
              <Link
                text="Ganti Password!"
                type={'login'}
                onPress={toPassword}
              />
            </View>
            <ButtonMed
              text="Logout"
              backgroundColor="#66bb6a"
              onPress={onPress}
            />
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
                container: {
                  backgroundColor: '#66bb6a',
                },
              }}>
              <View style={styles.pagex}>
                <ButtonMed
                  text="Buka Kamera"
                  backgroundColor="#66bbbb"
                  onPress={onCamera}
                />
                <ButtonMed
                  text="Photo Galery"
                  backgroundColor="#6a66bb"
                  onPress={onPick}
                />
              </View>
            </RBSheet>
          </View>
        ) : (
          <LoadingComponent />
        )}
      </ScrollView>
    </View>
  );
}
