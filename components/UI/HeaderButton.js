import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={IonIcons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

CustomHeaderButton.propTypes = {};

CustomHeaderButton.defaultProps = {};

export default CustomHeaderButton;
