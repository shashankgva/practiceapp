import React from 'react';
import {Text, View, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const CartItem = props => {
  const {qty, title, amount, onRemove} = props;
  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>{qty}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amt}>{amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={() => onRemove()}
            style={styles.deleteButton}>
            <IonIcons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {},
  title: {},
  amt: {},
  deleteButton: {
    marginLeft: 20,
  },
});

CartItem.propTypes = {};

CartItem.defaultProps = {};

export default CartItem;
