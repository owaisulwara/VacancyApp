import React from 'react';
import {View,ScrollView,Text,Image,TouchableOpacity,Dimensions} from 'react-native';
import firebase from 'firebase';

const {width:viewportWidth} = Dimensions.get('window');

class SliderPost extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Important Post',
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
            data:null
        }
    }

    getPostData = async(id) => {
        await firebase.database().ref('slider/'+id).on('value', (data) => {
            this.setState({data:data.toJSON()})
        })
    }

    navigateToPost(item){
        this.props.navigation.navigate('Vacancies',{item})
    }

    componentDidMount(){
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        this.getPostData(id);
    }

    render(){
        if(this.state.data === null){
            return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{marginTop:15,fontWeight:'bold'}}>Loading...</Text>
                </View>
            )
        }
        return(
            <ScrollView style={{marginTop:10}} contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Image
                        source={{uri:this.state.data.imageUrl}}
                        style={{width:viewportWidth,height:250}}
                    />
                </View>
                <View>
                    <Text style={{marginTop:10,fontSize:21,fontWeight:'bold',textAlign:'center'}}>
                        {this.state.data.name}
                    </Text>
                </View>
                <View>
                    <Text style={{marginTop:10, fontSize:18, textAlign:'center'}}>
                        {this.state.data.description}
                    </Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.navigateToPost(this.state.data)} style={{marginBottom:10,marginTop:10}}>
                        <Text style={{fontSize:21,color:'rgb(91, 131, 255)',fontWeight:'bold'}}>go to post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

}

export default SliderPost;