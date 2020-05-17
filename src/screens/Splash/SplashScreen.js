import React from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import styles from './styles';
import firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {LocalNotification} from '../../RemoteMessage';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading:true,
      ipv4Address:''
    }
  }

  splashLoading = async() => {

    let firebaseConfig = {
      apiKey: "AIzaSyAvDynbbZzbga26-HqpAxy06V61uwnTgp4",
      authDomain: "vacancy-sl-32041.firebaseapp.com",
      databaseURL: "https://vacancy-sl-32041.firebaseio.com",
      projectId: "vacancy-sl-32041",
      storageBucket: "vacancy-sl-32041.appspot.com",
      messagingSenderId: "134304616778",
      appId: "1:134304616778:web:3c081ebf88a81f9397b1b3",
      measurementId: "G-Y32GNRYRZY"
    };
    try{
      firebase.initializeApp(firebaseConfig);
      this.setState({isLoading:false})
      this.props.navigation.navigate('Home');
    }catch(e){
      Alert.alert(
        'Error',
        'App not responding. Please restart the app!',
        [
          {
            text:'Go It!',
            onPress:() => console.log(e)
          },
          {
            text:'Cancel',
            onPress:() => console.log('Canceled')
          }
        ]
      );
    }
  }

  getIPV4Address = () => {
    NetInfo.fetch().then(state =>{
      this.setState({ipv4Address:state.details.ipAddress.toString()})
    })
  }

  checkDeviceRegigtered(){
    let isRegistered = false;
    const arr = this.state.ipv4Address.split('.')
    firebase.database().ref('users/'+arr[0]+arr[1]+arr[2]+arr[3]).on('value',(data) => {
      if(data.numChildren() !== 0){
        isRegistered = true
      }
    })
    return isRegistered;
  }

  regDeviceForNotification = async() => {

    const enabled = await messaging().hasPermission();
    
    if(enabled){
      messaging().
      getToken()
      .then(token =>{
        if(token){
          console.log("token: "+token);
          const date = new Date();
          const fullDate = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
          const arr = this.state.ipv4Address.split('.')
          firebase.database().ref('users/'+arr[0]+arr[1]+arr[2]+arr[3])
          .set({
            ipv4Address:this.state.ipv4Address,
            token:token,
            creatAt:fullDate
          })
          .then((res) => console.log(res))
        }else{
          console.log('Your device not have token yet')
        }
      })
    }else{
      console.log('No');
    }

  }

  
  async receiveNotification(){
    await messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage)
      LocalNotification(remoteMessage['notification'].title,remoteMessage['notification'].body)
    });
  }

 async onNotificationOpendedNavigation(){
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    const navigateTo = remoteMessage.data.navigation;
    if(navigateTo === 'dailyQuiz'){
      this.props.navigation.navigate('DailyQuiz');
    }else if(navigateTo === 'post'){
      const id = remoteMessage.data.id;
      firebase.database().ref('post/'+id).on('value', (data) => {
        const item = data.toJSON();
        this.props.navigation.navigate('Vacancies',{item});
      })
    }else{
      this.props.navigation.navigate('Home');
    }
  });
}


  componentDidMount(){
    this.getIPV4Address();
    setTimeout(() => {
      this.splashLoading();
      if(this.checkDeviceRegigtered() === false){
        this.regDeviceForNotification();
      }
      this.receiveNotification();
      this.onNotificationOpendedNavigation();
      NetInfo.fetch().then(state => {
        if(state.isInternetReachable === false){
          this.props.navigation.navigate('Error');
        }
      })
    },2000)
  }


  render() {
    if(this.state.isLoading === true){
      return (
        <View style={styles.container}>
           <StatusBar backgroundColor="rgb(255, 82, 49)" barStyle="default" />
          <Image
            source={require('../../../assets/icons/app-logo.png')}
            style={styles.photo}
          />
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return(
      <View></View>
    );
   
  }
}
