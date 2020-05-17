/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
//import firebase from '@react-native-firebase/app';
import {LocalNotification} from './src/RemoteMessage';



// let firebaseConfig = {
//     apiKey: "AIzaSyAvDynbbZzbga26-HqpAxy06V61uwnTgp4",
//     authDomain: "vacancy-sl-32041.firebaseapp.com",
//     databaseURL: "https://vacancy-sl-32041.firebaseio.com",
//     projectId: "vacancy-sl-32041",
//     storageBucket: "vacancy-sl-32041.appspot.com",
//     messagingSenderId: "134304616778",
//     appId: "1:134304616778:web:3c081ebf88a81f9397b1b3",
//     measurementId: "G-Y32GNRYRZY"
// };


// try{
//     firebase.initializeApp(firebaseConfig);
//     console.log(firebase.apps);
//   }catch(e){
//     console.log('Erro: '+e)
//   }

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    LocalNotification(remoteMessage['notification'].title,remoteMessage['notification'].body)
});

AppRegistry.registerComponent(appName, () => App);
