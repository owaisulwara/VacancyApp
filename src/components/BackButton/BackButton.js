import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class BackButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.btnContainer}>
        <Image source={require('../../../assets/icons/backArrow.png')} style={styles.btnIcon} />
      </TouchableOpacity>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
