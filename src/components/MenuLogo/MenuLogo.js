import React from 'react';
import {Image,View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class MenuLogo extends React.Component {
  render() {
    return (
        <View style={styles.logoContainer}>
          <Image source={this.props.source} style={styles.logo} />
        </View>
    );
  }
}

MenuLogo.propTypes = {
  source: PropTypes.number,
};
