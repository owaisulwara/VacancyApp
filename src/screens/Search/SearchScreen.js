import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';

const { width: viewportWidth } = Dimensions.get('window');

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED',
            width:Math.floor((viewportWidth * 3)/4),
            justifyContent:'center',
            alignItems:'center'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black',
          }}
          //icon={require('../../../assets/icons/search_icon.png')}
          onChangeText={text => params.handleSearch(text)}
          onClear={() => params.handleSearch('')}
          placeholder="Seach"
          value={params.data}
        />
      ),
      headerStyle:{
        backgroundColor:'rgb(255, 99, 31)'
      },
      headerTintColor:'rgb(255,255,255)'
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: []
    };
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if(state.isInternetReachable === false){
        this.props.navigation.navigate('Error');
      }
    })
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue
    });
  }

  getVacancyByVacancyName(text){
    const nameUpper = text.toUpperCase();
    const vacanciesArray = [];
    let array = [];
    firebase.database().ref('post').on('value',(data) => {
      for(let i in data.toJSON()){
        array.push(data.toJSON()[i])
      }
    });
    array.map(data => {
      if(data.name.toUpperCase().includes(nameUpper)){
        vacanciesArray.push(data);
      }
    });
    return vacanciesArray;
  }

  getVacancyByCategoryName(text){
    const nameUpper = text.toUpperCase();
    const vacanciesArray = [];
    let array = [];
    firebase.database().ref('post').on('value',(data) => {
      for(let i in data.toJSON()){
        array.push(data.toJSON()[i])
      }
    });
    array.map(data => {
      if(data.category.toUpperCase().includes(nameUpper)){
        vacanciesArray.push(data);
      }
    });
    return vacanciesArray;
  }

  getCategoryName(id){
    let category = ""
    firebase.database().ref('post/'+id).on('value',(data) => {
      category = data.toJSON().category
    });
    return category;
  }

  handleSearch = text => {
    let vacanciesArray1 = this.getVacancyByVacancyName(text);
    let vacanciesArray2 = this.getVacancyByCategoryName(text);
    let aux = vacanciesArray1.concat(vacanciesArray2);
    let vacanciesArray = [...new Set(aux)];
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
        data: vacanciesArray
      });
    }
  };

  getValue = () => {
    return this.state.value;
  };

  onPressRecipe = item => {
    this.props.navigation.navigate('Vacancies', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.imageUrl }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{this.getCategoryName(item.id)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
