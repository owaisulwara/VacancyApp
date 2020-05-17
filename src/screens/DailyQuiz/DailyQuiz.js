import React from 'react'
import { View,Text,Dimensions,ActivityIndicator,TouchableOpacity,Image, Alert } from 'react-native';
import firebase from 'firebase';
import styles from './styles';

const {width:viewportWidth} = Dimensions.get('window');

class DailyQuiz extends React.Component{
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
            data:[],
            isLoading:true
        }
    }

    componentDidMount(){
        this.getDailyQuiz();
        
        setTimeout(() => {
            Alert.alert(
                'அனைவருக்கும் வெற்றி',
                'பதிலளித்து 100/= ரீலோட்டை வென்றிடுங்கள்',
                [
                    {
                        text:'Got it!'
                    },
                ]
            );
        },2000)
    }

    getDailyQuiz = async() => {
        await firebase.database().ref('dailyQuiz').on('value', (data) => {
            let array = [];
            for(let i in data.toJSON()){
                array.push(data.toJSON()[i])
            }
            this.setState({data:array})
            this.setState({isLoading:false})
        })
    }

    navigateHandler(){
        this.props.navigation.navigate('DailyQuizForm',{question:this.state.data[0].question,gSheetUrl:this.state.data[0].gSheetUrl})
    }


    render(){
        if(this.state.data.length === 0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color="rgb(255, 99, 31)"/>
                    <Text style={{fontWeight:'bold'}}>Please wait till question to be update</Text>
                </View>
            )
        }
        return(
            <View>
                <View>
                    <Image style={{height:200,width:viewportWidth}} source={{uri:this.state.data[0].imageUrl}} />
                </View>
                <View>
                    <Text style={{fontSize:22,fontWeight:'bold',margin:10}}>{this.state.data[0].question}</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <TouchableOpacity onPress={() => this.navigateHandler()} style={styles.btn}>
                        <Text style={styles.btnTxt}>Answer it!</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        );
    }
}

export default DailyQuiz;