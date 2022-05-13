import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@/components/atoms';

const LogoutButton = ({style, onPress}) => {
  return (
    <View style={[style, styles.container]}>
      <Button
        style={styles.button}
        styleTxt={styles.title}
        title="LOGOUT"
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#3ECF8E',
    borderRadius: 50,
    width: '30%',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default LogoutButton;