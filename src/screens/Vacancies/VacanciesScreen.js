import React from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import {getCurrentViews,getCurrentLikes,getCurrentShares,getCurrentRating} from '../../data/data';
import { Rating } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';

export default class VacanciesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category:'',
      isActive:false,
      likes:0,
      views:0,
      shares:0,
      rating:0,
      shareResult:'',
      isBookMark:false,
      ipAddress:''
    };
  }

  static navigationOptions = ({ navigation }) => ({
      title:'',
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTintColor:'rgb(255,255,255)'
  });

  sharePost = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    
    Share.share({
      message:item.name+"\n\n"+item.description+"\n\n"+item.imageUrl,
    })
    .then((result) => this.setState({shareResult:result}))
  }

  async componentDidMount(){

    NetInfo.fetch().then(state => {
      if(state.isInternetReachable === false){
        this.props.navigation.navigate('Error');
      }
    })
    
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    this.updateViews(item.id,item.views)
    // alert(category+" "+item.id+" "+item.views)
    this.setState({likes:getCurrentLikes(item.id)})
    this.setState({views:getCurrentViews(item.id)})
    this.setState({shares:getCurrentShares(item.id)});
    this.setState({rating:getCurrentRating(item.id)});
  }

  getIPV4Address = () => {
    NetInfo.fetch().then(state =>{
      this.setState({ipv4Address:state.details.ipAddress.toString()})
    })
  }

  bookMark = async() => {
    await AsyncStorage.setItem('isBookMark','1');
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    this.getIPV4Address();

    setTimeout(() => {
      const arr = this.state.ipv4Address.split('.');
      firebase.database().ref('bookMarks/'+arr[0]+arr[1]+arr[2]+arr[3]+'/'+item.id).set({
        name:item.name,
        description:item.description,
        imageUrl:item.imageUrl,
        id:item.id,
        category:item.category
      })
      .then(() => {
        ToastAndroid.showWithGravity(
          "Book Marked!",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .catch((e) => alert('Error! Try again!'))
      this.setState({isBookMark:true});
    },5000)


  }


  updateViews = (id,currentView) => {
    let updateView = currentView + 1;
    firebase.database().ref('post/'+id).update({
      views:updateView
    });
  }

  async updateLikes(){
    const category = await AsyncStorage.getItem('category');
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    let updateLike = item.like + 1;
    firebase.database().ref('post/'+item.id).update({
      like:updateLike
    });
    this.setState({isActive:true})
  }

  updateShares = async() =>{
    const category = await AsyncStorage.getItem('category');
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    let updateShare = item.share + 1;
    firebase.database().ref('post/'+item.id).update({
      share:updateShare
    });
  }

ratingCompleted = async(rating) => {
   const category = await AsyncStorage.getItem('category');
   const { navigation } = this.props;
   const item = navigation.getParam('item');
    firebase.database().ref('post/'+item.id).update({
      rate:rating
    })
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  render() {

    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={{flex:1,width:'100%',height:250}}>
            <ImageBackground style={styles.image} source={{ uri: item.imageUrl }}>
              <View style={{alignSelf:'flex-end',marginRight:10,marginTop:15}}>
                <TouchableHighlight onPress={this.bookMark}>
                  <Image 
                    style={{width:30,height:30}}
                    source={require('../../../assets/icons/bookmark.png')} 
                  />
                </TouchableHighlight>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.name}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1,marginRight:5,alignItems:'flex-end'}}>
              <Text><Image style={{height:20, width:20}} source={require('../../../assets/icons/view.png')} /> {this.state.views}</Text>
            </View>
            <View style={{flex:1,marginLeft:5}}>
              <Text><Image style={{height:20, width:20}} source={require('../../../assets/icons/rate.png')} /> {this.state.rating}</Text>
            </View>
          </View>
          <Text>Rate the post</Text>
          <Rating
            startingValue={this.state.rating}
            showRating
            onFinishRating={this.ratingCompleted}
          />
        </View>
          <TouchableHighlight style={{alignSelf:'center',marginBottom:50}} disabled={this.state.isActive} onPress={() => this.updateLikes()}>
            <View>
            <Text style={{textAlign:'center',fontSize:20}}>{this.state.likes}</Text>
              <Image style={{height:50, width:50}} source={require('../../../assets/icons/like.png')} />
            </View>
          </TouchableHighlight>
          {/* <View style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:20}}>
              <TouchableHighlight disabled={this.state.isActive} onPress={this.updateLikes}>
                <Text><Image style={{height:40, width:40}} source={require('../../../assets/icons/like.png')} /> {this.state.likes}</Text>
              </TouchableHighlight>
            <View style={{flex:1,marginLeft:5}}>
            <TouchableHighlight onPressIn={this.sharePost} onPressOut={this.updateShares}>
              <Text><Image style={{height:20, width:20}} source={require('../../../assets/icons/share.png')} /> {this.state.shares}</Text>
            </TouchableHighlight>
            </View>
          </View> */}
      </ScrollView>
    );
  }
}

