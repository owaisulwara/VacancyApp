import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class MenuCategory extends React.Component {
  render() {
    return (
        <View style={{alignSelf:'center',backgroundColor:'rgb(255, 99, 31)',width:'100%'}}>
          <Text style={{color:'rgb(255, 255, 255)',fontSize:20,fontWeight:'bold',textAlign:'center'}}>{this.props.title.toUpperCase()}</Text>
        </View>
    );
  }
}

MenuCategory.propTypes = {
    title: PropTypes.string
};
