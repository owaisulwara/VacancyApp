import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft:10
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  btnIcon: {
    height: 20,
    width: 20
  },
  btnText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 0
  }
});

export default styles;
