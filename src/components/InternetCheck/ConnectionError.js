import React from 'react';
import {View,Alert,Image} from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import Styles from './Styles';

class ConnectionError extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    checkConnection(){
        NetInfo.fetch().then(state => {
            if(state.isInternetReachable === true){
                this.props.navigation.navigate('Home')
            }else{
                this.alertError();
            }
        })
    }

    alertError = () => {

        Alert.alert(
            'Connection Error',
            'No Internet Connection. Please Connect internet and try again.',
            [
                {
                    text:'OK',
                    onPress:() => this.checkConnection()
                }
            ]
        );
    }

    componentDidMount(){
        this.alertError()
    }

    render(){
        return(
            <View style={Styles.container}>
                <Image
                    source={require('../../../assets/icons/error.png')}
                    style={Styles.photo}
                />
            </View>
        );
    }
}

export default ConnectionError;