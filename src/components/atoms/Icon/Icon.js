import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {ColorHook} from '@/themeStore';

const Icon = ({
  style,
  name,
  FontAwesome5 = true,
  color,
  size = 18,
  touchable = false,
  onPress = () => {},
}) => {
  const Colors = ColorHook();

  const iconStyle = useMemo(() => {
    return getStyles(color == null ? Colors.secondaryColor_dark : color, size);
  }, [Colors, color, size]);

  return (
    <View style={[styles.container, style]}>
      {touchable ? (
        <TouchableOpacity onPress={onPress}>
          {FontAwesome5 ? (
            <Icon5 name={name} style={iconStyle} />
          ) : (
            <Icon4 name={name} style={iconStyle} />
          )}
        </TouchableOpacity>
      ) : (
        <View>
          {FontAwesome5 ? (
            <Icon5 name={name} style={iconStyle} />
          ) : (
            <Icon4 name={name} style={iconStyle} />
          )}
        </View>
      )}
    </View>
  );
};

const getStyles = (color, size) =>
  StyleSheet.create({
    color: color,
    fontSize: size,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;