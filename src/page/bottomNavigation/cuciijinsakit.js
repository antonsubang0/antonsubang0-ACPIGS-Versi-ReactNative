import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import StatusBar from '../../atom/statusbar';
import RNPickerSelect from 'react-native-picker-select';
import TextCs from '../../atom/text';
import ButtonMed from '../../atom/buttonMed';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {formData, httpPCuti, httpPijin, httpPsakit} from '../../http';
import {Toast} from '../../toast';
import LoadingComponent from '../../component/loading';
import RBSheet from 'react-native-raw-bottom-sheet';

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  pagex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    fontFamily: 'Poppins-Regular',
  },
  picker: {
    marginRight: 0.3 * Dimensions.get('window').width,
    backgroundColor: '#efefef',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 55,
  },
  tanggal: {
    padding: 10,
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    width: 0.8 * Dimensions.get('window').width,
    marginTop: 10,
  },
  inputss: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 0.8 * Dimensions.get('window').width,
    borderColor: '#ddd',
    fontSize: (18 / 320) * Dimensions.get('window').width,
    backgroundColor: '#efefef',
    textAlignVertical: 'top',
    marginTop: 10,
  },
  parentform: {
    marginTop: 15,
  },
  img: {
    height: 0.8 * Dimensions.get('window').width,
    width: 0.8 * Dimensions.get('window').width,
    marginTop: 15,
    borderRadius: 5,
    resizeMode: 'contain',
  },
});

export default function CutiIjinSakit({navigation}) {
  const onBack = () => navigation.goBack();
  const refRBSheet = React.useRef();
  const [tgl, setTgl] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeForm, setTypeForm] = useState(0);
  const [data, setData] = useState({
    tanggal: `${tgl.getDate()} - ${tgl.getMonth() + 1} - ${tgl.getFullYear()}`,
    keperluan: '',
    image: '',
  });
  const isiForm = (type, val) => {
    setData(formData(data, type, val));
  };
  const onKirim = async () => {
    setLoading(true);
    let result;
    if (typeForm === 1) {
      result = await httpPCuti(data.tanggal, data.keperluan);
    } else if (typeForm === 3) {
      result = await httpPijin(data.tanggal, data.keperluan);
    } else {
      result = await httpPsakit(data.tanggal, data.image);
    }
    setLoading(false);
    if (result.messages.status === 'sukses') {
      navigation.replace('Sukses');
    } else {
      if (result.messages.tanggal) {
        return Toast(result.messages.email);
      }
      if (result.messages.keperluan) {
        return Toast(result.messages.password);
      }
      if (result.messages.image) {
        return Toast(result.messages.image);
      }
      if (result.messages.error) {
        return Toast(result.messages.error);
      }
    }
  };
  const onChoose = () => {
    refRBSheet.current.open();
  };
  const onPick = () => {
    refRBSheet.current.close();
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      compressImageMaxHeight: 800,
      compressImageMaxWidth: 600,
      compressImageQuality: 0.7,
      mediaType: 'photo',
    })
      .then(async ress => {
        ImagePicker.openCropper({
          path: ress.path,
          width: 600,
          height: 800,
          compressImageMaxHeight: 800,
          compressImageMaxWidth: 600,
          includeBase64: true,
        })
          .then(async image => {
            setData(
              formData(
                data,
                'image',
                `data:${image.mime};base64, ${image.data}`,
              ),
            );
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  const onCamera = () => {
    refRBSheet.current.close();
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      compressImageMaxHeight: 800,
      compressImageMaxWidth: 600,
      compressImageQuality: 0.7,
      mediaType: 'photo',
    })
      .then(async ress => {
        ImagePicker.openCropper({
          path: ress.path,
          width: 600,
          height: 800,
          compressImageMaxHeight: 600,
          compressImageMaxWidth: 800,
          includeBase64: true,
        })
          .then(async image => {
            console.log(image.size);
            setData(
              formData(
                data,
                'image',
                `data:${image.mime};base64, ${image.data}`,
              ),
            );
          })
          .catch(err => err);
      })
      .catch(err => err);
  };
  return (
    <View style={styles.all}>
      <StatusBar onPress={onBack} type={'home'} text={'AGAPE'} />
      {loading ? <LoadingComponent /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.picker}>
            <RNPickerSelect
              onValueChange={value => setTypeForm(value)}
              placeholder={{label: 'Pilih Form ...', value: 0}}
              items={[
                {label: 'Form Cuti', value: 1},
                {label: 'Form Sakit', value: 2},
                {label: 'Form Ijin', value: 3},
              ]}
              style={styles.select}
            />
          </View>
          {typeForm === 1 || typeForm === 3 ? (
            <View>
              <View style={styles.parentform}>
                <TextCs text={'Tanggal :'} size={16} color={'#000'} />
                <TouchableOpacity
                  style={styles.tanggal}
                  onPress={() => setOpen(true)}>
                  <TextCs text={data.tanggal} size={16} />
                </TouchableOpacity>
              </View>
              <View style={styles.parentform}>
                <TextCs text={'Keperluan :'} size={16} color={'#000'} />
                <TextInput
                  style={styles.inputss}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={val => isiForm('keperluan', val)}
                />
              </View>
              <View style={styles.parentform}>
                <ButtonMed
                  text="Kirim"
                  backgroundColor="#66bb6a"
                  onPress={onKirim}
                  disabled={data.keperluan === ''}
                />
              </View>
            </View>
          ) : typeForm === 2 ? (
            <View>
              <View style={styles.parentform}>
                <TextCs text={'Tanggal :'} size={16} color={'#000'} />
                <TouchableOpacity
                  style={styles.tanggal}
                  onPress={() => setOpen(true)}>
                  <TextCs text={data.tanggal} size={16} />
                </TouchableOpacity>
              </View>
              {data.image !== '' ? (
                <Image source={{uri: data.image}} style={styles.img} />
              ) : null}
              <View style={styles.parentform}>
                <ButtonMed
                  text="Upload Photo"
                  backgroundColor="#666bbb"
                  onPress={onChoose}
                />
              </View>
              <View style={styles.parentform}>
                <ButtonMed
                  text="Kirim"
                  backgroundColor="#66bb6a"
                  onPress={onKirim}
                  disabled={data.image === ''}
                />
              </View>
            </View>
          ) : (
            <View style={styles.parentform}>
              <TextCs text={'Silahkan Pilih Form'} size={16} color={'#000'} />
            </View>
          )}
        </View>
      </ScrollView>
      <DatePicker
        modal
        open={open}
        date={tgl}
        mode="date"
        locale="id"
        onConfirm={async sss => {
          await isiForm(
            'tanggal',
            `${sss.getDate()} - ${sss.getMonth() + 1} - ${sss.getFullYear()}`,
          );
          setTgl(sss);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
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
