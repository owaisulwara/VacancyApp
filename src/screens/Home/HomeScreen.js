import React from 'react';
import { RefreshControl, FlatList, ScrollView, Text, View, TouchableHighlight, TouchableOpacity, StatusBar, ImageBackground, Dimensions, Image, TouchableWithoutFeedback, } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { getAllSlider } from '../../data/data'
import AsyncStorage from '@react-native-community/async-storage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BannerAd, InterstitialAd } from '../../components/AdMob';

const { width: viewportWidth } = Dimensions.get('window');

// const shadowOpt = {
//   width: 160,
//   height: 170,
//   color: "#000",
//   border: 2,
//   radius: 3,
//   opacity: 0.2,
//   x: 0,
//   y: 3,
//   style: { marginVertical: 5 }
// };

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerStyle: {
      backgroundColor: 'rgb(255, 99, 31)'
    },
    headerTitleStyle: {
      color: 'rgb(255,255,255)'
    },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });


  constructor(props) {
    super(props);
    this.ScrollView_Ref = React.createRef();
    this.state = {
      activeSlide: 0,
      isLoading: false,
      data: [],
    }
  }

  async setPostCategory(category) {
    await AsyncStorage.setItem('category', category);
  }


  getAllPostdata = async () => {

    firebase.database().ref('post').on('value', (data) => {
      this.setState({ isLoading: true })
      let array = [];
      for (let i in data.toJSON()) {
        array.push(data.toJSON()[i])
      }
      this.setState({ data: array })
      this.setState({ isLoading: false })
    })
  }

  componentDidMount() {
	  InterstitialAd();

    NetInfo.fetch().then(state => {
      if (state.isInternetReachable === false) {
        this.props.navigation.navigate('Error');
      }
    })

    this.getAllPostdata();
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Vacancies', { item });
    this.setPostCategory(item.category.toString().toLowerCase());
  };

  renderVacancy = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onPressRecipe(item)}>
      <View style={{ flexDirection: 'row', margin: wp(1), backgroundColor: 'rgb(255,255,255)', elevation: 3, padding: wp(2) }}>
        <View style={{ flex: 0.8, justifyContent: 'center', alignContent: 'center' }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: wp(40), height: hp(15.5), borderRadius: 5 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.name.slice(0, 50)}...</Text>
          </View>
          <View>
            <Text style={{ color: "rgb(120, 120, 120)" }}>{item.description.slice(0, 50)}...read more</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: wp(2) }}>
              <Text><Icon name="calendar" color="rgb(120, 120, 120)" /> {item.postAt}</Text>
            </View>
            <View>
              <Text><Icon name="clock" color="rgb(120, 120, 120)" /> {item.postTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  renderImage = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPressRecipe(item)}>
      <ImageBackground source={{ uri: item.imageUrl }} style={{ width: viewportWidth, height: 300, alignItems: 'center', justifyContent: 'center' }}>
        {/* <View style={{flex:0.3,backgroundColor:'rgba(255,255,255,0.1)',padding:5,borderRadius:5,width:viewportWidth,justifyContent:'center',alignItems:'center',alignSelf:'stretch'}}>
          <Text style={{fontWeight:'bold',fontSize:15}}>{item.name.slice(0,50)}...</Text>
        </View> */}
      </ImageBackground>
    </TouchableHighlight>
  );

  navigateToNews() {
    const item = { name: 'News' }
    this.props.navigation.navigate('VacanciesList', { item });
  }

  navigateToCovid19() {
    const category = { name: 'Covid19' }
    this.props.navigation.navigate('VacanciesList', { category });
  }

  upButtonHandler() {
    const scroll = this.ScrollView_Ref.current;
    scroll.scrollTo({ x: 0, y: 0, animated: true })
  };

  render() {
    const { activeSlide } = this.state;
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={this.getAllPostdata} />} ref={this.ScrollView_Ref} style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
        <StatusBar backgroundColor="rgb(255, 82, 49)" barStyle="default" />
        <View style={styles.carouselContainer}>
          <View>
           <BannerAd />
          </View>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={getAllSlider()}
              renderItem={this.renderImage}
              sliderWidth={wp(100)}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={true}
              autoplay={true}
              autoplayDelay={5000}
              autoplayInterval={5000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={getAllSlider().length}
              activeDotIndex={activeSlide}
              containerStyle={{ marginTop: -90 }}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 10,
                marginLeft: 15
              }}
              inactiveDotColor="red"
              inactiveDotOpacity={0.9}
              inactiveDotScale={0.7}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" horizontal={true} contentContainerStyle={{ backgroundColor: 'rgb(230, 230, 230)', padding: wp(2), alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginLeft: wp(5), marginRight: wp(5) }}>
            <View>
              <TouchableOpacity onPress={() => alert('Please Stay tuned for update')}>
                <Image
                  source={require('../../../assets/icons/IQ.png')}
                  style={{ width: wp(13), height: wp(13) }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Intelligent{'\n'}Quiz Test</Text>
            </View>
          </View>
          <View style={{ marginLeft: wp(5), marginRight: wp(5) }}>
            <View>
              <TouchableOpacity onPress={() => alert('Please Stay tuned for update')}>
                <Image
                  source={require('../../../assets/icons/GK.png')}
                  style={{ width: wp(13), height: wp(13) }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>General{'\n'}Knowledge</Text>
            </View>
          </View>
          <View style={{ marginLeft: wp(5), marginRight: wp(5) }}>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyQuiz')}>
                <Image
                  source={require('../../../assets/icons/Quiz.png')}
                  style={{ width: wp(13), height: wp(13) }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Weekly{'\n'}Quiz</Text>
            </View>
          </View>
          <View style={{ marginLeft: wp(5), marginRight: wp(5) }}>
            <View>
              <TouchableOpacity onPress={() => this.navigateToNews()}>
                <Image
                  source={require('../../../assets/icons/News.png')}
                  style={{ width: wp(13), height: wp(13) }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Breaking{'\n'}News</Text>
            </View>
          </View>
          <View style={{ marginLeft: wp(5), marginRight: wp(5) }}>
            <View>
              <TouchableOpacity onPress={() => this.navigateToCovid19()}>
                <Image
                  source={require('../../../assets/icons/Covid.png')}
                  style={{ width: wp(13), height: wp(13) }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Covid-19{'\n'}News</Text>
            </View>
          </View>
        </ScrollView>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.data}
          refreshing={this.state.isLoading}
          onRefresh={this.getAllPostdata}
          renderItem={this.renderVacancy}
          keyExtractor={item => `${item.id}`}
        />
        {this.state.data.length === 0 ?
          (<View></View>) :
          (<TouchableOpacity onPress={() => this.upButtonHandler()}>
            <Image
              style={{ alignSelf: 'flex-end', margin: wp(3), width: 30, height: 30 }}
              source={require('../../../assets/icons/up-arrow.png')}
            />
          </TouchableOpacity>)
        }
      </ScrollView>
    );
  }
}
