import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Badge, Card, Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {formatDate, useTranslator} from '@aos-mobile/core';
import StockMove from '../../../types/stock-move';

interface InternalMoveCardProps {
  style?: any;
  name: string;
  status: number;
  availability: number;
  fromStockLocation: string;
  toStockLocation: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const InternalMoveCard = ({
  style,
  name,
  status,
  availability,
  fromStockLocation,
  toStockLocation,
  origin,
  date,
  onPress,
}: InternalMoveCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const borderStyle = useMemo(() => {
    return getStyles(StockMove.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{name}</Text>
          <Text style={styles.txtDetails}>{fromStockLocation}</Text>
          <Text style={styles.txtDetails}>{toStockLocation}</Text>
          {origin != null && (
            <View style={styles.origin}>
              <Icon name="tag" size={12} style={styles.icon} />
              <Text style={styles.txtDetails}>{origin}</Text>
            </View>
          )}
          {status === StockMove.status.Draft ? (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_CreatedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          ) : status === StockMove.status.Planned ? (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_PlannedFor')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          ) : (
            <Text style={styles.txtDetails}>
              {`${I18n.t('Base_ValidatedOn')} ${formatDate(
                date,
                I18n.t('Base_DateFormat'),
              )}`}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          {availability != null && (
            <Badge
              color={StockMove.getAvailabilityColor(availability, Colors)}
              title={StockMove.getAvailability(availability, I18n)}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  rightContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  creationDate: {
    fontStyle: 'italic',
  },
  origin: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default InternalMoveCard;
