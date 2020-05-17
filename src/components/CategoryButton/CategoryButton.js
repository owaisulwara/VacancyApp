import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class CategoryButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.btnClickContain}
      >
        <View style={styles.btnContainer}>
          <Image source={this.props.source} style={styles.btnIcon} />
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

CategoryButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
