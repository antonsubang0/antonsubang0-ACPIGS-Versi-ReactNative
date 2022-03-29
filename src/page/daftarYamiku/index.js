import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';
import LoadingComponent from '../../component/loading';
import {httpYamikuInfo} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';

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
  parentTitle: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  parentItem: {
    marginHorizontal: 15,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomColor: '#ccc',
  },
});

export default function DaftarYamiku({navigation}) {
  const [data, setData] = React.useState(null);
  const onBack = () => {
    navigation.goBack();
  };
  const first = async () => {
    const result = await httpYamikuInfo();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setData(message.msg);
    }
  };
  React.useEffect(() => {
    first();
  }, []);
  return (
    <View style={styles.all}>
      <StatusBar onPress={onBack} type={'back'} text={'Daftar Yamiku'} />
      {data ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.parentTitle}>
            <TextCs
              text={'Belum Ambil'}
              size={14}
              weight={'700'}
              color={'#c00'}
            />
          </View>
          {data.belumyamiku.length > 0 ? (
            data.belumyamiku.map((item, index) => (
              <View style={styles.parentItem} key={index}>
                <TextCs
                  text={`${index + 1}. ${item.nama} - Time - Security`}
                  size={10}
                  weight={'400'}
                  color={'#000'}
                />
              </View>
            ))
          ) : (
            <View style={styles.parentItem}>
              <TextCs
                text={'Data Kosong'}
                size={10}
                weight={'400'}
                color={'#000'}
              />
            </View>
          )}
          <View style={styles.parentTitle}>
            <TextCs
              text={'Sudah Diambil'}
              size={14}
              weight={'700'}
              color={'#00c'}
            />
          </View>
          {data.sudahyamiku.length > 0 ? (
            data.sudahyamiku.map((item, index) => (
              <View style={styles.parentItem} key={index}>
                <TextCs
                  text={`${index + 1}. ${item.nama} - ${
                    item.wkt_pengambilan ? item.wkt_pengambilan : 'Kosong'
                  } - ${item.dicek_oleh ? item.dicek_oleh : 'Kosong'}`}
                  size={10}
                  weight={'400'}
                  color={'#000'}
                />
              </View>
            ))
          ) : (
            <View style={styles.parentItem}>
              <TextCs
                text={'Data Kosong'}
                size={10}
                weight={'400'}
                color={'#000'}
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <LoadingComponent />
      )}
    </View>
  );
}
