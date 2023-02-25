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
    setSearchInput(e.nativeEvent.text);
    debouncedSearch(e.nativeEvent.text);
  };

  const debouncedSearch = useCallback(
    debounce(text => dispatch(fetchSearchData({location: text})), 1000),
    [],
  );

  const renderSearchResults = ({item}) => {
    // console.log({item: item.weatherUrl[0]})
    const locationName = `${item.areaName[0].value}, ${item.country[0].value}`;
    return (
      <SearchItem
        content={locationName}
        onPress={() => {
          dispatch(fetchWeatherData({location: locationName}));
          dispatch(
            setCurrentLocation({
              currentLocation: {id: locationName, locationName},
              type: 'location',
            }),
          );
        }}
      />
    );
  };

  const renderBookmarkedLocations = ({item}) => {
    const locationName = bookmarkedLocations[item].locationName;
    return (
      <SearchItem
        content={locationName}
        onPress={() => {
          dispatch(fetchWeatherData({location: locationName}));
          dispatch(
            setCurrentLocation({
              currentLocation: {id: locationName, locationName: locationName},
              type: 'location',
            }),
          );
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
        {Object.keys(bookmarkedLocations).length !== 0 ? (
          <FlatList
            data={Object.keys(bookmarkedLocations)}
            renderItem={renderBookmarkedLocations}
          />
        ) : (
          <Text style={{color: theme.textColor}}>
            You don't have any favorite locations yet
          </Text>
        )}
      </View>
    );
  };

  const extractKey = item => {
    return item?.areaName[0]?.value;
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
          keyExtractor={extractKey}
        />
      )}
      {renderBookmarkSection()}
    </View>
  );
}
export default SearchScreen;
