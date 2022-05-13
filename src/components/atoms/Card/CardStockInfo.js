import React from 'react';
import {StyleSheet, View} from 'react-native';

const CardStockInfo = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    width: '28.2%',
    height: '28%',
    marginHorizontal: '1%',
    marginVertical: '1%',
  },
});

export default CardStockInfo;