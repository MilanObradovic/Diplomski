import {FlatList, Text, TextInput, View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectBookmarkedLocations} from '../redux/selectors/bookmark';
import {fetchSearchData} from '../redux/modules/locations';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {
  selectSearchLocations,
  selectSearchLocationsLoadingStatus,
} from '../redux/selectors/currentLocation';
import {debounce} from 'lodash';
import {LoadingStatuses} from '../types';
import {SearchItem} from '../components/searchItem';
import {AppThemeContext} from '../context/theme';
import {fetchWeatherData} from '../redux/modules/weather';
import {setCurrentLocation} from '../redux/reducers/currentLocation';

function SearchScreen() {
  const dispatch = useAppDispatch();

  const {theme} = useContext(AppThemeContext);

  const [searchInput, setSearchInput] = useState('');

  const bookmarkedLocations = useSelector(selectBookmarkedLocations);
  const searchLocations = useSelector(selectSearchLocations);
  const loading = useSelector(selectSearchLocationsLoadingStatus);

  const onTextChange = e => {
    console.log('ovde');
    setSearchInput(e.nativeEvent.text);
    debouncedSearch(e.nativeEvent.text);
  };

  const debouncedSearch = useCallback(
    debounce(text => dispatch(fetchSearchData({location: text})), 1000),
    [],
  );

  const renderSearchResults = ({item}) => {
    const locationName = `${item.areaName[0].value}, ${item.country[0].value}`;
    return (
      <SearchItem
        content={locationName}
        onPress={() => {
          dispatch(fetchWeatherData({location: locationName}));
          dispatch(setCurrentLocation({id: locationName, name: locationName}));
        }}
      />
    );
  };

  const renderBookmarkedLocations = ({item}) => {
    const locationName = bookmarkedLocations[item].name;
    return (
      <SearchItem
        content={locationName}
        onPress={() => {
          dispatch(fetchWeatherData({location: locationName}));
          dispatch(setCurrentLocation({id: locationName, name: locationName}));
        }}
      />
    );
  };

  const renderBookmarkSection = () => {
    return (
      <View style={{marginTop: 16}}>
        <Text style={{color: theme.textColor, fontWeight: 'bold'}}>
          Favorites
        </Text>
        <FlatList
          data={Object.keys(bookmarkedLocations)}
          renderItem={renderBookmarkedLocations}
        />
      </View>
    );
  };

  return (
    <View style={{backgroundColor: theme.backgroundColor}}>
      <View style={{flexDirection: 'row', paddingBottom: 16}}>
        <TextInput
          placeholder={'Search a place...'}
          value={searchInput}
          onChange={onTextChange}
          style={{
            height: 40,
            backgroundColor: theme.gray,
            borderRadius: 8,
            color: theme.textColor,
            paddingHorizontal: 16,
            width: '100%',
          }}
          placeholderTextColor={theme.textColor}
        />
      </View>
      {loading === LoadingStatuses.Initializing && (
        <Text style={{color: theme.textColor}}>....Searching...</Text>
      )}
      {loading === LoadingStatuses.Fetched && searchInput !== '' && (
        <FlatList
          ListHeaderComponent={
            <Text style={{color: theme.textColor, fontWeight: 'bold'}}>
              Results
            </Text>
          }
          data={searchLocations}
          renderItem={renderSearchResults}
        />
      )}
      {renderBookmarkSection()}
    </View>
  );
}
export default SearchScreen;
