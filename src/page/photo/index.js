import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../../assets/logo';
import Avatar from '../../atom/avatar';
import ButtonMed from '../../atom/buttonMed';
import TextCs from '../../atom/text';
import ImagePicker from 'react-native-image-crop-picker';
import {httpGantiPhoto, httpProfile} from '../../http';
import {Toast} from '../../toast';
import {logoutRemoveToken} from '../../storage';
import LoadingComponent from '../../component/loading';
import RBSheet from 'react-native-raw-bottom-sheet';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 25,
    position: 'absolute',
    top: 35,
    right: 10,
  },
  login: {
    marginTop: 55,
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
});

export default function Photo({navigation}) {
  const refRBSheet = React.useRef();
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [lanjut, setLanjut] = useState(false);
  const [loading, setLoading] = useState(false);
  const onPress = async () => {
    setLoading(true);
    const temp = String(photo).split(' ')[1];
    const result = await httpGantiPhoto(temp);
    setLoading(false);
    const message = result.messages;
    if (message.status === 'sukses') {
      return navigation.replace('Sukses');
    }
    if (message.error) {
      return Toast(message.error);
    }
    if (message.upload) {
      return Toast(message.upload);
    }
  };
  const onChoose = () => {
    refRBSheet.current.open();
  };
  const onPick = () => {
    refRBSheet.current.close();
    ImagePicker.openPicker({
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
            setPhoto(`data:${image.mime};base64, ${image.data}`);
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
            setPhoto(`data:${image.mime};base64, ${image.data}`);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  const first = async () => {
    const result = await httpProfile();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setUser(message.msg.user);
    }
  };
  React.useEffect(() => {
    first();
  }, []);
  React.useEffect(() => {
    photo ? setLanjut(true) : setLanjut(false);
  }, [photo]);
  return (
    <View style={styles.page}>
      {loading ? <LoadingComponent /> : null}
      <View style={styles.logo}>
        <Logo dimensi={70} />
      </View>
      <Avatar logo={photo ? photo : null} onPress={onChoose} />
      {user ? (
        <View style={styles.info}>
          <TextCs text={user.nama} size={18} weight={'700'} color={'#000'} />
          <TextCs text={user.uid} size={18} weight={'700'} color={'#000'} />
          <TextCs text={user.bnama} size={18} weight={'700'} color={'#000'} />
        </View>
      ) : (
        <TextCs text={'Ada kesalahan.'} size={16} weight={'600'} />
      )}
      <View style={styles.login} />
      <ButtonMed
        text="Lanjut"
        backgroundColor="#66bb6a"
        onPress={onPress}
        disabled={!lanjut}
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
  );
}
