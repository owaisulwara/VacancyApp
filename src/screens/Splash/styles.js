import { StyleSheet, Dimensions} from 'react-native';
const {width:viewportWidth,height:viewportHeight} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: (viewportWidth/2) + 50,
    height: (viewportHeight/4) - 88
  },
});

export default styles;
