import React from 'react';
import { View,Text } from 'react-native';
import { WebView } from 'react-native-webview';


class DailyQuizForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Weekly Quiz',
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
        }
    }

    render(){
        const { navigation } = this.props;
        const item = navigation.getParam('question')
        const url = navigation.getParam('gSheetUrl');
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.2}}>
                    <Text style={{margin:10,fontSize:22}}>{item}</Text>
                </View>
                <View style={{flex:1}}>
                    <WebView
                        source={{uri:url}}
                    />
                </View>
            </View>
        )
    }
}

export default DailyQuizForm;