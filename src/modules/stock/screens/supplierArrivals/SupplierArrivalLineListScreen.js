import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  SupplierArrivalLineCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import StockMove from '@/modules/stock/types/stock-move';
import {fetchSupplierArrivalLines} from '../../features/supplierArrivalLineSlice';
import {ChipSelect, ScrollList} from '@/components/organisms';
import {ColorHook} from '@/themeStore';

const SupplierArrivalLineListScreen = ({route, navigation}) => {
  const Colors = ColorHook();
  const supplierArrival = route.params.supplierArrival;
  const {loadingSALines, moreLoading, isListEnd, supplierArrivalLineList} =
    useSelector(state => state.supplierArrivalLine);
  const [filteredList, setFilteredList] = useState(supplierArrivalLineList);
  const [doneStatus, setDoneStatus] = useState(false);
  const [undoneStatus, setUndoneStatus] = useState(false);
  const dispatch = useDispatch();

  const handleShowLine = item => {
    if (supplierArrival.statusSelect === StockMove.status.Realized) {
      navigation.navigate('SupplierArrivalLineDetailScreen', {
        supplierArrivalLine: item,
        supplierArrival: supplierArrival,
      });
    } else {
      navigation.navigate('SupplierArrivalSelectProductScreen', {
        supplierArrivalLine: item,
        supplierArrival: supplierArrival,
      });
    }
  };

  const fetchSupplierLinesAPI = useCallback(
    page => {
      dispatch(
        fetchSupplierArrivalLines({
          supplierArrivalId: supplierArrival.id,
          page: page,
        }),
      );
    },
    [supplierArrival.id, dispatch],
  );

  const handleDoneStatus = () => {
    if (!doneStatus && undoneStatus) {
      setUndoneStatus(!undoneStatus);
    }
    setDoneStatus(!doneStatus);
  };

  const handleUndoneStatus = () => {
    if (!undoneStatus && doneStatus) {
      setDoneStatus(!doneStatus);
    }
    setUndoneStatus(!undoneStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (doneStatus) {
          return list.filter(item => parseFloat(item.realQty) != null);
        } else if (undoneStatus) {
          return list.filter(item => parseFloat(item.realQty) == null);
        } else {
          return list;
        }
      }
    },
    [doneStatus, undoneStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(supplierArrivalLineList));
  }, [supplierArrivalLineList, filterOnStatus]);

  return (
    <Screen>
      <StockMoveHeader
        reference={supplierArrival.stockMoveSeq}
        status={supplierArrival.statusSelect}
        date={
          supplierArrival.statusSelect === StockMove.status.Draft
            ? supplierArrival.createdOn
            : supplierArrival.statusSelect === StockMove.status.Planned
            ? supplierArrival.estimatedDate
            : supplierArrival.realDate
        }
      />
      <LocationsMoveCard
        fromStockLocation={supplierArrival.fromAddress?.fullName}
        toStockLocation={supplierArrival.toStockLocation?.name}
        editable={true}
      />
      <ChipSelect>
        <Chip
          selected={doneStatus}
          title="Done"
          onPress={handleDoneStatus}
          selectedColor={{
            backgroundColor: Colors.primaryColor_light,
            borderColor: Colors.primaryColor,
          }}
        />
        <Chip
          selected={undoneStatus}
          title="Not Done"
          onPress={handleUndoneStatus}
          selectedColor={{
            backgroundColor: Colors.secondaryColor_light,
            borderColor: Colors.secondaryColor,
          }}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loadingSALines}
        data={filteredList}
        renderItem={({item}) => (
          <SupplierArrivalLineCard
            style={styles.item}
            productName={item.product?.fullName}
            deliveredQty={item?.realQty}
            askedQty={item?.qty}
            trackingNumber={item?.trackingNumber}
            onPress={() => {
              handleShowLine(item);
            }}
          />
        )}
        fetchData={fetchSupplierLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default SupplierArrivalLineListScreen;