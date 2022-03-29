import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';
import CardCuti from '../../component/cardCuti';
import {httpCuti, downloadPdf} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  pageContent: {
    flex: 1,
    paddingVertical: 10,
  },
  card: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    backgroundColor: '#fefefe',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
  },
  headerCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentCard: {
    paddingTop: 5,
  },
  footerCard: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  iconcenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  gapBtm: {
    height: 30,
  },
  noFo: {
    marginHorizontal: 20,
  },
});

export default function Cuti({navigation}) {
  const [cuti, setCuti] = React.useState(null);
  const onBack = () => {
    navigation.goBack();
  };
  const first = async () => {
    const result = await httpCuti();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setCuti(message.msg);
    }
  };
  const download = async url => {
    const result = await downloadPdf(url);
    if (result === 'Gagal') {
      Toast('Gagal Mengunduh');
    } else {
      Toast('Behasil Mengunduh : ' + result);
      navigation.navigate('PdfViewer', {
        url: result,
      });
    }
  };
  React.useEffect(() => {
    first();
  }, []);
  return (
    <View style={styles.page}>
      <StatusBar onPress={onBack} type={'back'} text={'Daftar Cuti'} />
      <ScrollView style={styles.pageContent}>
        {cuti && cuti.length > 0 ? (
          cuti.map((data, index) => (
            <CardCuti
              data={data}
              key={index}
              margin={15}
              onPress={() => download(data.url)}
            />
          ))
        ) : (
          <View style={styles.noFo}>
            <TextCs text={'Kosong.'} size={14} color={'#000'} />
          </View>
        )}
        <View style={styles.gapBtm} />
      </ScrollView>
    </View>
  );
}
