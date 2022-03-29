import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';
import Cardijin from '../../component/cardIjin';
import {httpIjin} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  pageContent: {
    flex: 1,
    paddingTop: 5,
  },
  gapBtm: {
    height: 30,
  },
  noFo: {
    marginHorizontal: 20,
  },
});

export default function Ijin({navigation}) {
  const [ijin, setIjin] = React.useState(null);
  const first = async () => {
    const result = await httpIjin();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setIjin(message.msg);
    }
  };
  React.useEffect(() => {
    first();
  }, []);
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.page}>
      <StatusBar onPress={onBack} type={'back'} text={'Daftar Ijin'} />
      <ScrollView style={styles.pageContent}>
        {ijin && ijin.length > 0 ? (
          ijin.map((data, index) => (
            <Cardijin key={index} data={data} margin={15} />
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
