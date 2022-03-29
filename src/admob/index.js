import AdMob, {InterstitialAd} from '@admob-plus/react-native';

const admobStart = async () => {
  await AdMob.start();

  const interstitial = new InterstitialAd({
    adUnitId: 'ca-app-pub-7614489014916537/7725064979',
  });
  await interstitial.load();
  await interstitial.show();
};

export {admobStart};
