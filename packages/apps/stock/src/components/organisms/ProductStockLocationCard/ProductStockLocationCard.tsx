import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface ProductStockLocationCardProps {
  stockLocationName: string;
  unit: string;
  realQty: number;
  futureQty: number;
  reservedQty: number;
  availability: number;
}

const ProductStockLocationCard = ({
  stockLocationName,
  unit,
  realQty,
  futureQty,
  reservedQty,
  availability,
}: ProductStockLocationCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (availability == null) {
      return getStyles(Colors.secondaryColor.background).container;
    } else if (availability > 0) {
      return getStyles(Colors.primaryColor.background).container;
    } else {
      return getStyles(Colors.errorColor.background).container;
    }
  }, [Colors, availability]);

  return (
    <Card style={borderStyle}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Icon name="warehouse" size={18} style={styles.icon} />
          <Text>{stockLocationName}</Text>
        </View>
        <LabelText
          title={`${I18n.t('Stock_RealQty')} :`}
          value={`${realQty} ${unit}`}
        />
        <LabelText
          title={`${I18n.t('Stock_FutureQty')} :`}
          value={`${futureQty} ${unit}`}
        />
        {reservedQty > 0 && (
          <LabelText
            iconName="user-tag"
            title={`${I18n.t('Stock_AllocatedQty')} :`}
            value={`${reservedQty} ${unit}`}
          />
        )}
      </View>
      <View style={styles.badgeContainer}>
        {(availability == null || availability > 0) && (
          <Badge
            title={
              availability == null
                ? `${I18n.t('Stock_Calculing')}...`
                : availability > 0 && `${availability} ${unit}`
            }
            color={
              availability == null
                ? Colors.secondaryColor
                : availability > 0 && Colors.primaryColor
            }
          />
        )}
      </View>
    </Card>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      marginHorizontal: 11,
      marginBottom: 8,
      paddingRight: 15,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    marginRight: 10,
  },
});

export default ProductStockLocationCard;
