import {
  Dimensions,
  FlatList,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {AppThemeContext} from '../../context/theme';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import ScreenWrapper from '../../components/screenWrapper';
import {useSelector} from 'react-redux';
import {selectBookmarkedLocations} from '../../redux/selectors/bookmark';
import {setCurrentLocation} from '../../redux/reducers/currentLocation';
import {requestLocation} from '../../hooks/useUserLocation';
import {faLocationArrow, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {fetchBookmarksForUser} from '../../redux/modules/bookmark';
import {selectIsUserLoggedIn, selectUser} from '../../redux/selectors/user';
import {fetchWeatherData} from '../../redux/modules/weather';
import {Modalize} from 'react-native-modalize';
import SearchScreen from '../search';
import Button from '../../components/button';
import notifee from '@notifee/react-native';
import {sendNot} from '../../redux/api/bookmark';

export const LocationChooser = props => {
  const {navigation} = props;
  const {theme} = useContext(AppThemeContext);
  const dispatch = useAppDispatch();
  const bookmarkedLocations = useSelector(selectBookmarkedLocations);
  const userData = useSelector(selectUser);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const bottomSheetRef = useRef(null);

  const renderSearchInputAndResults = () => {
    return (
      <Modalize
        ref={bottomSheetRef}
        withHandle
        modalTopOffset={64}
        childrenStyle={{paddingHorizontal: 16, paddingVertical: 16}}
        modalStyle={{backgroundColor: theme.backgroundColor}}
        snapPoint={Dimensions.get('screen').height / 2}
        disableScrollIfPossible>
        <SearchScreen navigation={navigation} />
      </Modalize>
    );
  };
  const renderBookmark = ({item}: {item: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          height: 100,
          width: '100%',
          borderRadius: 10,
          borderColor: theme.gray,
          borderWidth: 2,
          marginBottom: 16,
          overflow: 'hidden',
        }}
        onPress={() => {
          if (item === 0) {
            requestLocation({
              successCallback: info => {
                dispatch(
                  setCurrentLocation({
                    currentLocation: {
                      latitude: info.latitude,
                      longitude: info.longitude,
                    },
                    type: 'coordinates',
                  }),
                );
                dispatch(
                  fetchWeatherData({
                    userCoords: {
                      latitude: info.latitude,
                      longitude: info.longitude,
                    },
                  }),
                );
              },
              blockedCallback: () => {
                console.log('blocked');
              },
            });
          } else {
            dispatch(
              setCurrentLocation({
                currentLocation: bookmarkedLocations[item],
                type: 'location',
              }),
            );
            dispatch(
              fetchWeatherData({
                location: bookmarkedLocations[item]?.locationName,
              }),
            );
          }
          navigation.navigate('Main');
        }}>
        <ImageBackground
          style={{
            flex: 1,
            opacity: 0.5,
          }}
          source={require('../../landscape.jpeg')}
        />
        <View
          style={{
            paddingTop: 8,
            paddingLeft: 8,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: theme.fontSize.lg,
              color: theme.textColor,
              paddingRight: 16,
            }}>
            {item === 0
              ? 'Your location'
              : bookmarkedLocations[item].locationName}
          </Text>
          {item === 0 && (
            <FontAwesomeIcon
              color={theme.textColor}
              icon={faLocationArrow}
              size={24}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const extractKey = item => item;

  const reFetchData = () => {
    if (isUserLoggedIn) {
      dispatch(fetchBookmarksForUser({userId: userData!.username}));
    }
  };

  return (
    <ScreenWrapper navigation={navigation}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <FlatList
          data={[0, ...Object.keys(bookmarkedLocations)]}
          renderItem={renderBookmark}
          keyExtractor={extractKey}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reFetchData} />
          }
        />
        <View
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
          }}>
          <Button
            isOutlined={false}
            text={'a'}
            onPress={() => {
              // bottomSheetRef?.current.open();
                    sendNot();

            }}
            icon={faSearch}
          />
          {/*<FontAwesomeIcon icon={faSearch} color={lightPrimary} size={30} />*/}
        </View>
        {renderSearchInputAndResults()}
      </View>
    </ScreenWrapper>
  );
};
