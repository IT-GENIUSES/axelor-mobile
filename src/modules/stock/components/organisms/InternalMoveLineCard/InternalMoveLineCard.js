import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge, LabelText} from '@/components/molecules';
import StockMove from '@/modules/stock/types/stock-move';
import {checkNullString} from '@/modules/stock/utils/strings';
import {ColorHook} from '@/themeStore';

const InternalMoveLineCard = ({
  style,
  internalMoveStatus = StockMove.status.Planned,
  productName,
  availability,
  trackingNumber,
  locker,
  expectedQty,
  movedQty,
  onPress,
}) => {
  const Colors = ColorHook();
  const borderStyle = useMemo(() => {
    if (parseFloat(movedQty) === 0) {
      return null;
    } else if (parseFloat(expectedQty) === parseFloat(movedQty)) {
      return getStyles(Colors.primaryColor);
    } else {
      return getStyles(Colors.cautionColor);
    }
  }, [Colors, expectedQty, movedQty]);

  const rightStyle = useMemo(() => {
    return internalMoveStatus === StockMove.status.Realized
      ? styles.noBadge
      : styles.badge;
  }, [internalMoveStatus]);

  const leftStyle = useMemo(() => {
    return internalMoveStatus === StockMove.status.Realized
      ? styles.textContainerNoBadge
      : styles.textContainer;
  }, [internalMoveStatus]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={leftStyle}>
          <Text style={styles.txtImportant}>{productName}</Text>
          <LabelText
            title="Asked quantity :"
            value={parseFloat(expectedQty).toFixed(2)}
          />
          <LabelText
            title="Moved quantity :"
            value={parseFloat(movedQty).toFixed(2)}
          />
          {checkNullString(locker) === false && (
            <LabelText
              title="Locker :"
              value={locker}
              iconName="map-marker-alt"
            />
          )}
          {trackingNumber != null && (
            <LabelText
              title="Tracking number :"
              value={trackingNumber}
              iconName="qrcode"
              FontAwesome5={false}
            />
          )}
        </View>
        <View style={rightStyle}>
          {availability == null ||
          availability === '' ||
          internalMoveStatus === StockMove.status.Realized ? null : (
            <Badge
              color={
                StockMove.getAvailabilityColor(availability, Colors)
                  .backgroundColor
              }
              title={availability}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderWidth: 1.5,
    borderColor: color,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '2%',
    paddingRight: 8,
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textContainerNoBadge: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badge: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noBadge: {
    width: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default InternalMoveLineCard;