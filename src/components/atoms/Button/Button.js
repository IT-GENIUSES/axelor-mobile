import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useThemeColor} from '@/features/themeSlice';

const Button = ({
  style,
  color,
  title,
  onPress = () => {},
  disabled = false,
}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(color == null ? Colors.primaryColor : color, Colors);
  }, [Colors, color]);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (backgroundColor, Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingVertical: 5,
      marginVertical: 10,
      borderRadius: 35,
      width: '40%',
      height: 40,
      backgroundColor: backgroundColor,
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.text,
      textAlign: 'center',
    },
  });

export default Button;
