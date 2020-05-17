import {StyleSheet, Dimensions} from 'react-native';
const {width:viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'rgb(255, 99, 31)',
    padding:10,
    borderRadius:5
  },
  btnTxt:{
    fontSize:20,
    fontWeight:'bold',
    color:'rgb(255,255,255)'
  }
});

export default styles;