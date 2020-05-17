import React from 'react';
import firebase from 'firebase';
import {View,Text,FlatList,TouchableHighlight,Image,Alert,ToastAndroid,ScrollView, ActivityIndicator,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {width:viewportWidth} = Dimensions.get('window');

class BookMark extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Book Marks',
        headerStyle:{
          backgroundColor:'rgb(255, 99, 31)'
        },
        headerTitleStyle:{
          color:'rgb(255,255,255)'
        },
        headerTintColor:'rgb(255,255,255)'
      });

    
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            data:[],
            msg:'',
            isShow:false,
            ipAddress:''
        }
    }

    getIPV4Address = () => {
        NetInfo.fetch().then(state =>{
          this.setState({ipv4Address:state.details.ipAddress.toString()})
        })
    }

    async componentDidMount(){
        NetInfo.fetch().then(state => {
            if(state.isInternetReachable === false){
              this.props.navigation.navigate('Error');
            }
        })

        this.getIPV4Address();

        setTimeout(async() => {
            const isBookMared = await AsyncStorage.getItem('isBookMark')
            if(isBookMared === '1'){
                this.getBookMarks()
            }else{
                alert('No Book Marks');
            }
        },3000)
    }

    async removeBookMarked(){
        await AsyncStorage.setItem('isBookMark','0');
    }

    deleteBookMark = (id) => {
        const arr = this.state.ipv4Address.split('.');
        firebase
        .database().ref('bookMarks/'+arr[0]+arr[1]+arr[2]+arr[3]+'/'+id)
        .remove()
        .then(() => {
            ToastAndroid.showWithGravity(
                "Removed!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        })
        .catch((e) => alert('Error! Please try again.'))
        try{
            this.getBookMarks();
        }
        catch(e){
            alert('No Data Show')
        }

        if(this.state.data.length === 0){
            this.setState({msg:'No Data Show'})
            this.setState({isShow:true})
            this.removeBookMarked();
        }
        
    }

    
    menuItem(id){

        Alert.alert(
            'Alert',
            'Delete BookMark?',
            [
                {
                    text:'Ok',
                    onPress:() => this.deleteBookMark(id)
                },
                {
                    text:'Cancel',
                    onPress: () => console.log('Canceled'),
                    style:'cancel'
                }
            ],
            { cancelable: false }
        )
    }

    getBookMarks = () => {
        const arr = this.state.ipv4Address.split('.');
        firebase.database().ref('bookMarks/'+arr[0]+arr[1]+arr[2]+arr[3]).on('value',(date) => {
            let array = [];
            this.setState({isLoading:true});
            for(let i in date.toJSON()){
                array.push(date.toJSON()[i])
            }
            this.setState({data:array});
            this.setState({isLoading:false});
        });
    }

    async onNavigateToPost(category,id){
        await firebase.database().ref('vacancy/'+category+'/'+id).on('value', (data) => {
            const item = data.toJSON();
            this.props.navigation.navigate('Vacancies', {item})
        })
    }

    renderVacancy = ({ item }) => (
        <TouchableHighlight onPress={() => this.onNavigateToPost(item.category,item.id)} onLongPress={() => this.menuItem(item.id)} underlayColor='rgba(73,182,77,1,0.9)'>
            <View style={{flex:1,flexDirection:'row',margin:wp('2.5%')}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image
                        source={{uri:item.imageUrl}}
                        style={{width:wp('40%'),height:hp('20%')}}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text>{item.name.slice(0,50)}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        if(this.state.data.length === 0){
            return(
                <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }
        return (
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex:1}}>
              <View style={{flex:1}}>
                <FlatList
                data={this.state.data}
                refreshing={this.state.isLoading}
                onRefresh={this.getBookMarks}
                renderItem={this.renderVacancy}
                keyExtractor={item => `${item.id}`}
                />
            </View>
            {/* <View style={{flex:0.1,justifyContent:'center',alignItems:'baseline'}}>  
                {!this.state.isShow && <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-7456522045283222/2704504754"
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.log(error)}
                />}
            </View> */}
          </ScrollView>
        );
    }
}

export default BookMark;