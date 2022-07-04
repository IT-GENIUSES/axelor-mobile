import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {InventoryHeader} from '../../components/organisms';

const productScanKey = 'product_inventory-select';

const InventorySelectProductScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const {productList} = useSelector(state => state.product);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleProductSelection = item => {
    if (item !== null) {
      if (item.id !== inventoryLine?.product.id) {
        setVisible(true);
      } else if (item.trackingNumberConfiguration != null) {
        navigation.navigate('InventorySelectTrackingScreen', {
          inventoryLine: inventoryLine,
          inventory: inventory,
          product: item,
        });
      } else {
        navigation.navigate('InventoryLineDetailsScreen', {
          inventoryLine: inventoryLine,
          inventory: inventory,
          product: item,
        });
      }
    }
  };

  return (
    <Screen>
      <InventoryHeader
        reference={inventory.inventorySeq}
        status={inventory.statusSelect}
        date={
          inventory.statusSelect === Inventory.status.Planned
            ? inventory.plannedStartDateT
            : inventory.plannedEndDateT
        }
        stockLocation={inventory.stockLocation?.name}
      />
      {inventory.fromRack && (
        <LocationsMoveCard
          fromStockLocation={inventory.fromRack}
          toStockLocation={inventory.toRack}
        />
      )}
      <AutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleProductSelection(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder="Product"
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title="Warning"
        data="This is not the right product."
        btnTitle="OK"
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

export default InventorySelectProductScreen;