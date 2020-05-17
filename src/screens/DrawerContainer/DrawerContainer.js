import React from 'react';
import { View,ScrollView,Linking,Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import MenuLogo from '../../components/MenuLogo/MenuLogo';
import MenuCategory from '../../components/MenuCategory/MenuCategory';

export default class DrawerContainer extends React.Component {
  constructor(props){
    super(props);
    this.scrollRef = React.createRef();
  }

  scrollToTo(){
    this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  }


  render() {
    const { navigation } = this.props;
    return (
      <ScrollView onTouchEndCapture={() => this.scrollToTo()} ref={this.scrollRef} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <MenuLogo
              source={require('../../../assets/icons/main.png')}
          />
          <MenuCategory
            title="navigation"
          />
            <MenuButton
              title="HOME"
              source={require('../../../assets/icons/home.png')}
              onPress={() => {
                navigation.navigate('Home');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="CATEGORIES"
              source={require('../../../assets/icons/catogory.png')}
              onPress={() => {
                navigation.navigate('Categories');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="SEARCH"
              source={require('../../../assets/icons/search.png')}
              onPress={() => {
                navigation.navigate('Search');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="BOOKMARKS"
              source={require('../../../assets/icons/bookmark.png')}
              onPress={() => {
                navigation.navigate('BookMark');
                navigation.closeDrawer();
              }}
            />
          </View>
          <MenuCategory
            title="Social Media"
          />
          <MenuButton
            title="FACEBOOK"
            source={require('../../../assets/icons/fb.png')}
            onPress={() => {
              Linking.openURL('https://www.facebook.com/vacancysrilanka')
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="YOUTUBE"
            source={require('../../../assets/icons/yt.png')}
            onPress={() => {
              Linking.openURL('https://www.youtube.com/channel/UCRkS0Q4higCY8qcUGIhHCEA/')
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="TWITTER"
            source={require('../../../assets/icons/twit.png')}
            onPress={() => {
              Linking.openURL('https://twitter.com/Vacancylka')
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="INSTAGRAM"
            source={require('../../../assets/icons/insta.png')}
            onPress={() => {
              Linking.openURL('https://www.instagram.com/vacancysl/')
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="WHATSAPP"
            source={require('../../../assets/icons/wa.png')}
            onPress={() => {
              Linking.openURL('https://wa.link/db91y3')
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="COMMUNITY"
            source={require('../../../assets/icons/community.png')}
            onPress={() => {
              Linking.openURL('https://www.facebook.com/groups/vacancysl')
              navigation.closeDrawer();
            }}
          />
           <MenuCategory
            title="Support Us"
          />
          {/* <MenuButton
            title="RATE US"
            source={require('../../../assets/icons/rateus.png')}
            onPress={() => {
              navigation.navigate('RateUs');
              navigation.closeDrawer();
            }}
          /> */}
          <MenuButton
            title="Privacy Policy"
            source={require('../../../assets/icons/privacy.png')}
            onPress={() => {
              navigation.navigate('Privacy');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="ABOUT US"
            source={require('../../../assets/icons/aboutus.png')}
            onPress={() => {
              navigation.navigate('AboutUs');
              navigation.closeDrawer();
            }}
          />
          <Text style={{marginBottom:5,textAlign:'center',fontSize:12,color:"rgb(255, 82, 49)"}}>Copyright © {(new Date()).getFullYear()} Vacancy Sri Lanka</Text>
      </ScrollView>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
