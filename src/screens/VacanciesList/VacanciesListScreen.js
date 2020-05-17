import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import styles from './styles';
import firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width:viewportWidth} = Dimensions.get('window');


export default class VacanciesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:navigation.getParam("item").name,
    headerStyle:{
      backgroundColor:'rgb(255, 99, 31)'
    },
    headerTitleStyle:{
      color:'rgb(255,255,255)'
    },
    headerTintColor:'rgb(255,255,255)'
  });

  constructor(props) {
    super(props);
    this.state={
      isLoading:false,
      data:[]
    }
  }

  getDataByCategory = async() => {

    const { navigation } = this.props;
    const item = navigation.getParam("item")
    const category = item.name;
    
    firebase.database().ref('vacancy/'+category).on('value',(data) => {
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
    this.getDataByCategory();
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Vacancies', { item });
  };


  renderVacancy = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onPressRecipe(item)}>
      <View style={{flexDirection:'row',margin:wp(1),backgroundColor:'rgb(255,255,255)',elevation:3,padding:wp(2)}}>
        <View style={{flex:0.8,justifyContent:'center',alignContent:'center'}}>
          <Image
            source={{uri:item.imageUrl}}
            style={{width:wp(40),height:hp(15.5),borderRadius:5}}
          />
        </View>
        <View style={{flex:1}}>
          <View>
            <Text style={{fontWeight:'bold'}}>{item.name.slice(0,50)}...</Text>
          </View>
          <View>
            <Text style={{color:"rgb(120, 120, 120)"}}>{item.description.slice(0,50)}...read more</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{marginRight:wp(2)}}>
            <Text><Icon name="calendar" color="rgb(120, 120, 120)"/> {item.postAt}</Text>
          </View>
          <View>
            <Text><Icon name="clock" color="rgb(120, 120, 120)"/> {item.postTime}</Text>
          </View>
        </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {

    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          // vertical
          // showsVerticalScrollIndicator={false}
          // numColumns={2}
          data={this.state.data}
          refreshing={this.state.isLoading}
          onRefresh={this.getDataByCategory}
          renderItem={this.renderVacancy}
          keyExtractor={item => `${item.id}`}
        />
      </ScrollView>
    );
  }
}
