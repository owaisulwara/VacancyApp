import React from 'react';
import {View,Text,TouchableOpacity,Linking,ImageBackground} from 'react-native'; 
import styles from './styles'
import NetInfo from '@react-native-community/netinfo';

class AboutUS extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'About Us',
        headerStyle:{
          backgroundColor:'rgb(255, 99, 31)'
        },
        headerTitleStyle:{
          color:'rgb(255,255,255)'
        },
        headerTintColor:'rgb(255,255,255)'
      });

    componentDidMount(){
        NetInfo.fetch().then(state => {
            if(state.isInternetReachable === false){
              this.props.navigation.navigate('Error');
            }
        })
    }
    
    render(){
        return(
            <View style={styles.container}>
              <View>
                <Text style={{textAlign:'justify',fontSize:15}}>
                இலங்கையின் தமிழ் பேசும் உறவுகளுக்கான அனைத்து நாளாந்த அரச, அரசசார்பற்ற, வெளிநாட்டு வேலைவாய்ப்புகளையும் மேலும் அரச பாட நெறிகளுக்குமான தகவல்களை ஒரே பார்வையில் பெற்றுக்கொள்வதற்குமான தளத்தினை Vacancy Sri Lanka Team ஆகிய நாம் உருவாக்கி தந்துள்ளோம். மேலும்  இலவச தொழில், போட்டி பரீட்சைகளுக்கான வழிகாட்டுதல்கள்,கல்வி வழிகாட்டல் பணிகளும் எம்மால் முன்னெடுக்கப்படுகின்றது. மேலும் உடனுக்குடன் செய்திகளையும் துரிதமாக வழங்கி வருகிறோம்.
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/vacancysrilanka')} style={{alignSelf:'center'}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'rgb(101, 140, 224)'}}>மேலும் அறிய...</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.devContainer}>
                  <Text style={styles.devTxt}>Developer Details</Text>
                </View>
            </View>
        );
    }
}

export default AboutUS;