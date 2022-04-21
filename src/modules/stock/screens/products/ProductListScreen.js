import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, Text} from '@/components/atoms';
import {SearchBar} from '@/components/molecules';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {ProductCard} from '@/modules/stock/components/molecules';

const ProductListScreen = ({navigation}) => {
  const {loading, productList} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const showProductDetails = product => {
    navigation.navigate('ProductStockDetailsScreen', {productId: product.id});
  };

  return (
    <Screen style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        placeholder="Product"
        onSearchPress={() => dispatch(fetchProducts())}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={productList}
          renderItem={({item}) => (
            <ProductCard
              style={styles.item}
              name={item.name}
              code={item.code}
              onPress={() => showProductDetails(item)}
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

export default ProductListScreen;
