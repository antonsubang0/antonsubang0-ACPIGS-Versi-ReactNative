import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import StatusBar from '../../atom/statusbar';
import TextCs from '../../atom/text';
import {httpGaji} from '../../http';
import {logoutRemoveToken} from '../../storage';
import {Toast} from '../../toast';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  gapBtm: {
    height: 30,
  },
});

export default function Gaji({navigation}) {
  const [gaji, setGaji] = React.useState(null);
  const first = async () => {
    const result = await httpGaji();
    if (result === null) {
      return logoutRemoveToken(navigation, Toast);
    }
    const message = result.messages;
    if (message.status === 'failed') {
      return logoutRemoveToken(navigation, Toast);
    }
    if (message.status === 'sukses') {
      setGaji(message.msg);
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
      <StatusBar onPress={onBack} type={'back'} text={'Daftar Gaji'} />
      <ScrollView style={styles.pageContent}>
        {gaji ? (
          gaji.map((data, index) => (
            <TextCs
              key={index}
              text={`${index + 1}. Periode ${data.periode} : ${data.gaji}`}
              size={13}
              color={'#555'}
              weight={'400'}
            />
          ))
        ) : (
          <TextCs text={'Loading...'} size={16} weight={'700'} />
        )}
        <View style={styles.gapBtm} />
      </ScrollView>
    </View>
  );
}
