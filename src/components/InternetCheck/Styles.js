import {StyleSheet,Dimensions} from 'react-native';
const {width:viewportWidth} = Dimensions.get('window')

const Styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(255, 38, 37)'
    },
    photo:{
        width:Math.floor(viewportWidth/2),
    }
})

export default Styles