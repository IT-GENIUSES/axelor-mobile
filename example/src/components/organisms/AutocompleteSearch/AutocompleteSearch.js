import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AutocompleteItem, SearchBar, useThemeColor} from '@aos-mobile/ui';
import {CameraScanner} from '@aos-mobile/core';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '@/features/scannerSlice';

const TIME_WITHOUT_INPUT = 1000;
const TIME_BETWEEN_CALL = 1000;

interface AutocompleteSearchProps<T> {
  objectList: T[];
  value?: T;
  onChangeValue?: (value: T) => void;
  fetchData?: (value: T) => void;
  displayValue?: (value: T) => string;
  placeholder?: string;
  scanKeySearch?: string;
  isFocus?: Boolean;
  changeScreenAfter?: Boolean;
  navigate?: Boolean;
  oneFilter?: Boolean;
  searchBarKey?: Number;
}

const AutocompleteSearch = ({
  objectList,
  value,
  onChangeValue,
  fetchData,
  displayValue,
  placeholder,
  scanKeySearch,
  isFocus = false,
  changeScreenAfter = false,
  navigate = false,
  oneFilter = false,
  searchBarKey = 1,
}: AutocompleteSearchProps) => {
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [viewCoordinate, setViewCoordinate] = useState(null);
  const [displayList, setDisplayList] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [previousState, setPreviousState] = useState(null);
  const [newInterval, setNewInterval] = useState(0);
  const [selected, setSelected] = useState(false);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const dispatch = useDispatch();
  let timeOutRequestCall = useRef();
  let intervalRequestCall = useRef();

  useEffect(() => {
    if (value) {
      setSelected(true);
      setSearchText(displayValue(value));
    } else {
      handleAPICall();
    }
  }, [displayValue, handleAPICall, value]);

  const handleSelect = item => {
    setDisplayList(false);
    setSelected(true);
    if (changeScreenAfter) {
      setSearchText('');
    }
    onChangeValue(item);
  };

  useEffect(() => {
    if (navigate && oneFilter) {
      setSearchText('');
    }
  }, [navigate, oneFilter]);

  const handleClear = () => {
    setDisplayList(false);
    setSelected(false);
    setPreviousState(searchText);
    setSearchText('');
    onChangeValue(null);
  };

  useEffect(() => {
    if (scannedValue) {
      setSearchText(scannedValue);
    } else if (scanData != null && scanData.value != null) {
      setCamScan(false);
      setSearchText(scanData.value);
    }
  }, [scanData, scannedValue]);

  useEffect(() => {
    if (
      (previousState === '' || previousState == null) &&
      searchText != null &&
      searchText !== ''
    ) {
      const id = setInterval(
        () => setNewInterval(state => state + 1),
        TIME_BETWEEN_CALL,
      );
      intervalRequestCall.current = id;
    }
  }, [previousState, searchText]);

  const stopInterval = useCallback(() => {
    clearInterval(intervalRequestCall.current);
    setNewInterval(0);
  }, []);

  useEffect(() => {
    if (newInterval > 0) {
      handleAPICall();
    }
  }, [handleAPICall, newInterval]);

  useEffect(() => {
    if (searchText != null) {
      const id = setTimeout(handleTimeOut, TIME_WITHOUT_INPUT);
      timeOutRequestCall.current = id;

      return () => {
        clearTimeout(timeOutRequestCall.current);
      };
    }
  }, [handleTimeOut, searchText]);

  const handleTimeOut = useCallback(() => {
    stopInterval();
    if (!selected) {
      if (searchText == null && searchText === '') {
        fetchData(null);
      } else {
        fetchData(searchText);
      }
    }
  }, [fetchData, searchText, selected, stopInterval]);

  const handleAPICall = useCallback(() => {
    if (!selected) {
      if (searchText == null && searchText === '') {
        fetchData(null);
      } else {
        fetchData(searchText);
      }
    }
  }, [fetchData, searchText, selected]);

  useEffect(() => {
    if (
      objectList != null &&
      searchText != null &&
      searchText !== '' &&
      !selected
    ) {
      if (objectList.length === 1) {
        if (changeScreenAfter || oneFilter) {
          setSearchText('');
        } else {
          setSearchText(displayValue(objectList[0]));
          setDisplayList(false);
        }
        stopInterval();
        onChangeValue(objectList[0]);
      } else {
        setDisplayList(true);
      }
    }
  }, [
    changeScreenAfter,
    displayValue,
    objectList,
    onChangeValue,
    oneFilter,
    searchText,
    selected,
    stopInterval,
  ]);

  const containerPosition = useMemo(() => {
    return getStyles(searchBarKey, camScan);
  }, [searchBarKey, camScan]);

  const Colors = useThemeColor();

  return (
    <View
      style={containerPosition}
      onLayout={event => {
        const {x, y} = event.nativeEvent.layout;
        setViewCoordinate({x: x, y: y});
      }}>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        coordinate={viewCoordinate}
        onClose={() => setCamScan(false)}
      />
      <SearchBar
        valueTxt={searchText}
        placeholder={placeholder}
        onChangeTxt={input => {
          setPreviousState(searchText);
          setSearchText(input);
        }}
        onClearPress={handleClear}
        onSelection={() => {
          scanKeySearch ? dispatch(enableScan(scanKeySearch)) : undefined;
        }}
        onScanPress={() => setCamScan(true)}
        scanIconColor={
          isEnabled && scanKey === scanKeySearch
            ? Colors.primaryColor
            : Colors.secondaryColor_dark
        }
        onEndFocus={() => setDisplayList(false)}
        isFocus={isFocus}
      />
      {objectList != null &&
        objectList.length > 0 &&
        displayList &&
        !oneFilter && (
          <View style={styles.flatListContainer}>
            {objectList.slice(0, 4).map(item => (
              <AutocompleteItem
                key={item?.id.toString()}
                content={displayValue(item)}
                onPress={() => handleSelect(item)}
              />
            ))}
          </View>
        )}
    </View>
  );
};

const getStyles = (key, isActive) =>
  StyleSheet.create({
    position: 'relative',
    zIndex: isActive ? 20 + key : 20 - key,
  });

const styles = StyleSheet.create({
  flatListContainer: {
    height: 200, // 4 items : 4*flatListItem.height
    width: '100%',
    position: 'absolute',
    top: '90%',
    zIndex: 50,
  },
});

export default AutocompleteSearch;
