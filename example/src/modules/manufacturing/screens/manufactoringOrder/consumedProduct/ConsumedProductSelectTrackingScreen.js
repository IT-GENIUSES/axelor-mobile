import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ClearableCard,
  Screen,
  ScrollView,
  HeaderContainer,
} from '@aos-mobile/ui';
import {ScannerAutocompleteSearch, useTranslator} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '@/modules/manufacturing/components/organisms';
import {displayItemTrackingNumber} from '@/modules/stock/utils/displayers';
import {filterTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';

const trackingNumberScanKey =
  'tracking-number_manufacturing-order-consumed-product-select';

const ConsumedProductSelectTrackingScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const product = route.params.product;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const handleTrackingNumberSelection = item => {
    if (item != null) {
      navigation.navigate('ConsumedProductDetailsScreen', {
        manufOrder: manufOrder,
        product: product,
        trackingNumber: item,
      });
    }
  };

  return (
    <Screen listScreen={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
      />
      <ScrollView>
        <ClearableCard valueTxt={product.name} clearable={false} />
        <ScannerAutocompleteSearch
          objectList={trackingNumberList}
          onChangeValue={item => handleTrackingNumberSelection(item)}
          fetchData={fetchTrackingAPI}
          displayValue={displayItemTrackingNumber}
          scanKeySearch={trackingNumberScanKey}
          placeholder={I18n.t('Stock_TrackingNumber')}
          isFocus={true}
          changeScreenAfter={true}
        />
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductSelectTrackingScreen;
