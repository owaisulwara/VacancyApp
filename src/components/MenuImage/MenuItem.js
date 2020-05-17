import React from 'react';
import {Image,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import styles from './styles';

export default class MenuItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
      <Image
        style={{width:35,height:35}}
        source={require('../../../assets/icons/menuIcon.png')}
      />
    </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  onSelect: PropTypes.func
};
