import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@/components/atoms';
import useTranslator from '@/hooks/use-translator';

const LoginButton = ({onPress}) => {
  const I18n = useTranslator();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title={I18n.t('Auth.LOGIN')}
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
    width: '30%',
    elevation: 5,
  },
});

export default LoginButton;
