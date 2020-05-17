import React from 'react';

import {
    AdMobBanner,
    AdMobInterstitial
  } from 'react-native-admob';

  const BANNER_ID = "ca-app-pub-5846806239916122/1450869501";
  const INTERSTITIAL_ID = 'ca-app-pub-5846806239916122/7936386806';

  export const BannerAd = () => {
      return(
        <AdMobBanner
        adSize="banner"
        adUnitID= {BANNER_ID}
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}
        style={{alignSelf: 'center'}}
      />
      )
  }

  export const InterstitialAd = () => {
    AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }