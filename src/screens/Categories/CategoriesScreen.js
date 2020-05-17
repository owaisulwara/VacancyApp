import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
import {getCategoryCount} from '../../data/data'
import firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories',
    headerStyle:{
      backgroundColor:'rgb(255, 99, 31)'
    },
    headerTitleStyle:{
      color:'rgb(255,255,255)'
    },
    headerTintColor:'rgb(255,255,255)'
  };

  constructor(props) {
    super(props);
    this.state={
      isLoading:false,
      data:[]
    }
  }

  getCategory = async() => {

    firebase.database().ref('category').on('value',(data) => {
      let array = [];
      this.setState({isLoading:true})
        for(let i in data.toJSON()){
            array.push(data.toJSON()[i])
        }
        this.setState({data:array})
        this.setState({isLoading:false})
    })
  }

  componentDidMount(){
    NetInfo.fetch().then(state => {
      if(state.isInternetReachable === false){
        this.props.navigation.navigate('Error');
      }
    })
    this.getCategory();
  }

  async setPostCategory(category){
    await AsyncStorage.setItem('category',category);
  }

  onPressCategory = item => {
    this.props.navigation.navigate('VacanciesList', {item});
    this.setPostCategory(item.name.toString().toLowerCase())
  };

  renderCategory = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onPressCategory(item)}>
      <View style={{padding:wp('5%')}}>
        <View style={{borderWidth:3,borderRadius:wp('3%'),borderColor:'rgb(255,255,255)'}}>
          <Image
            source={{uri:item.imageUrl}}
            style={{width:wp('40%'),height:hp('20%')}}
          />
        </View>
        <View>
          <Text style={{fontSize:wp('4.5%'),fontWeight:'bold',textAlign:'center'}}>{item.name}</Text>
        </View>
        <View>
          <Text style={{fontSize:wp('4%'),textAlign:'center'}}>{getCategoryCount(item.name)} Posts</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View>
        <FlatList
          vertical
          numColumns={2}
          data={this.state.data}
          refreshing={this.state.isLoading}
          onRefresh={this.getCategory}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.name}`}
        />
      </View>
    );
  }
}
