import React from 'react';
import {View,Text} from 'react-native';
import { Rating } from 'react-native-elements';
import styles from './styles'
import NetInfo from '@react-native-community/netinfo';

class RateUS extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Rate Us',
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

    constructor(props){
        super(props);
        this.state={
            rating:0
        }
    }

    ratingCompleted = async(rating) => {
        this.setState({rating:rating});
        alert('Thank You for Rating us!');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:20,textAlign:'center'}}>Please Rate Us</Text>
                <Rating
                    showRating
                    onFinishRating={this.ratingCompleted}
                    style={{ paddingVertical: 10 }}
                />
            </View>
        );
    }
}

export default RateUS;