import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, IconNew} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {InternalMoveCard} from '@/modules/stock/components/molecules';
import filterList from '@/modules/stock/utils/filter-list';
import filterListContain from '@/modules/stock/utils/filter-list-contain';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {fetchInternalMoves} from '@/modules/stock/features/internalMoveSlice';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';
import useStockLocationScanner from '@/modules/stock/hooks/use-stock-location-scanner';
import useProductScanner from '@/modules/stock/hooks/use-product-scanner';

// STATUS SELECT
const STATUS_DRAFT = 1;
const STATUS_PLANNED = 2;
const STATUS_REALIZED = 3;
const STATUS_CANCELED = 4;

const getStatus = option => {
  if (option === STATUS_DRAFT) {
    return 'Draft';
  } else if (option === STATUS_PLANNED) {
    return 'Planned';
  } else if (option === STATUS_REALIZED) {
    return 'Realized';
  } else if (option === STATUS_CANCELED) {
    return 'Canceled';
  } else {
    return option;
  }
};

// AVAILABLE STATUS SELECT
const STATUS_AVAILABLE = 1;
const STATUS_PARTIALLY_AVAILABLE = 2;
const STATUS_UNAVAILABLE = 3;

const getAvailability = option => {
  if (option === STATUS_AVAILABLE) {
    return 'Available';
  } else if (option === STATUS_PARTIALLY_AVAILABLE) {
    return 'Partially';
  } else if (option === STATUS_UNAVAILABLE) {
    return 'Unavailable';
  } else {
    return option;
  }
};

const stockOriginalLocationScanKey =
  'stock-original-location_internal-move-list';
const stockDestinationLocationScanKey =
  'stock-destination-location_internal-move-list';
const productScanKey = 'product_internal-move-list';

const InternalMoveListScreen = ({navigation}) => {
  const {loadingInternalMove, internalMoveList} = useSelector(
    state => state.internalMove,
  );
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productList} = useSelector(state => state.product);
  const [originalStockLocation, setOriginalStockLocation] = useState(null);
  const [destinationStockLocation, setDestinationStockLocation] =
    useState(null);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInternalMoves());
    dispatch(fetchStockLocations());
    dispatch(fetchProducts());
  }, [dispatch]);

  const originalStockLocationScanned = useStockLocationScanner(
    stockOriginalLocationScanKey,
  );
  useEffect(() => {
    if (originalStockLocationScanned) {
      setOriginalStockLocation(originalStockLocationScanned);
    }
  }, [originalStockLocationScanned]);

  const destinationStockLocationScanned = useStockLocationScanner(
    stockDestinationLocationScanKey,
  );
  useEffect(() => {
    if (destinationStockLocationScanned) {
      setDestinationStockLocation(destinationStockLocationScanned);
    }
  }, [destinationStockLocationScanned]);

  const productScanned = useProductScanner(productScanKey);
  useEffect(() => {
    if (productScanned) {
      setProduct(productScanned);
    }
  }, [productScanned]);

  // ----------  FILTERS -------------
  const [filteredList, setFilteredList] = useState(internalMoveList);

  // Filter list on search params
  useEffect(() => {
    setFilteredList(
      filterListContain(
        filterList(
          filterList(
            internalMoveList,
            'fromStockLocation',
            'id',
            originalStockLocation?.id ?? '',
          ),
          'toStockLocation',
          'id',
          destinationStockLocation?.id ?? '',
        ),
        'stockMoveLineList',
        'productName',
        product?.id ?? '',
      ),
    );
  }, [
    internalMoveList,
    originalStockLocation,
    destinationStockLocation,
    product,
  ]);

  // ----------  NAVIGATION -------------
  const showInternalMoveDetails = internalMove => {
    navigation.navigate('InternalMoveDetailsScreen', {
      internalMove: internalMove,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconNew
          onNewPress={() => {
            navigation.navigate('InternalMoveNewOriginalLocationScreen', {});
          }}
        />
      ),
    });
  }, [navigation]);

  // ----------  REFRESH -------------

  const handleRefresh = useCallback(() => {
    dispatch(fetchInternalMoves());
  }, [loadingInternalMove]);

  return (
    <Screen style={styles.container}>
      <AutocompleteSearch
        objectList={stockLocationList}
        value={originalStockLocation}
        displayValue={displayItemName}
        filter={filterItemByName}
        onChangeValue={item => setOriginalStockLocation(item)}
        placeholder="Original Stock Location"
        scanKeySearch={stockOriginalLocationScanKey}
      />
      <AutocompleteSearch
        objectList={stockLocationList}
        value={destinationStockLocation}
        displayValue={displayItemName}
        filter={filterItemByName}
        onChangeValue={item => setDestinationStockLocation(item)}
        placeholder="Destination Stock Location"
        scanKeySearch={stockDestinationLocationScanKey}
      />
      <AutocompleteSearch
        objectList={productList}
        value={product}
        onChangeValue={item => setProduct(item)}
        displayValue={displayItemName}
        filter={filterItemByName}
        scanKeySearch={productScanKey}
        placeholder="Product"
      />
      {loadingInternalMove ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredList}
          refreshControl={
            <RefreshControl
              refreshing={loadingInternalMove}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({item}) => (
            <InternalMoveCard
              style={styles.item}
              name={item.stockMoveSeq}
              status={getStatus(item.statusSelect)}
              availability={getAvailability(item.availableStatusSelect)}
              fromStockLocation={item.fromStockLocation.name}
              toStockLocation={item.toStockLocation.name}
              origin={item.origin}
              date={
                item.statusSelect == STATUS_DRAFT
                  ? item.createdOn
                  : item.realDate
              }
              onPress={() => showInternalMoveDetails(item)}
            />
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default InternalMoveListScreen;