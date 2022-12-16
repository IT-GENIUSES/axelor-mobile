import React from 'react';
import {ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {useThemeColor} from '../../../theme/ThemeContext';
import {BlockInteractionScreen, Card} from '../../atoms';

/**
 * @description To activate this component, please use setActivityIndicator(true) from useConfig of aos-mobile/ui
 * @description To desactivate this component, please use setActivityIndicator(false) from useConfig of aos-mobile/ui
 */

const LoadingIndicator = () => {
  const Colors = useThemeColor();
  const {showActivityIndicator} = useConfig();

  if (!showActivityIndicator) {
    return null;
  }

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={styles.loadingIndicatorCard}>
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor.background}
        />
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  loadingIndicatorCard: {
    position: 'relative',
    top: Dimensions.get('window').height * 0.4,
    left: Dimensions.get('window').width * 0.4,
    elevation: 24,
    paddingRight: 24,
  },
});

export default LoadingIndicator;