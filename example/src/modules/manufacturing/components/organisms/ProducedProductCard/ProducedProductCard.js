import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, LabelText, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const ProducedProductCard = ({
  style,
  productName,
  plannedQty,
  producedQty,
  unitName,
  trackingNumberSeq = null,
  onPress = () => {},
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyles = useMemo(() => {
    if (plannedQty > producedQty) {
      return getStyles(Colors.plannedColor);
    }
    return getStyles(Colors.primaryColor);
  }, [Colors, plannedQty, producedQty]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.cardContainer, borderStyles, style]}>
        <Text style={styles.txtImportant}>{productName}</Text>
        <LabelText
          title={`${I18n.t('Manufacturing_PlannedQty')}:`}
          value={`${parseFloat(plannedQty).toFixed(2)} ${
            unitName != null ? unitName : ''
          }`}
        />
        <LabelText
          title={`${I18n.t('Manufacturing_ProducedQty')}:`}
          value={`${
            producedQty == null
              ? parseFloat(0).toFixed(2)
              : parseFloat(producedQty).toFixed(2)
          } ${unitName != null ? unitName : ''}`}
        />
        {trackingNumberSeq != null && (
          <LabelText
            iconName="qrcode"
            title={`${I18n.t('Manufacturing_TrackingNumber')}:`}
            value={trackingNumberSeq}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderLeftWidth: 7,
    borderLeftColor: color,
  });

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 12,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 15,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
});

export default ProducedProductCard;
