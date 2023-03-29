import React, {useContext, useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import LottieView from 'lottie-react-native';
import {
  selectLocationLogs,
  selectIsLoadingLocationLogs,
} from '../../redux/selectors/admin';
import {AppThemeContext} from '../../context/theme';
import {LocationLog} from '../../types';
import Section from '../../components/section';
import ScreenWrapper from '../../components/screenWrapper';
import Button from '../../components/button';
import {fetchLocationLogs} from '../../redux/modules/locations';

export const LocationLogsScreen = ({navigation}) => {
  const isLoading = useSelector(selectIsLoadingLocationLogs);
  const locationLogs = useSelector(selectLocationLogs);
  const {theme} = useContext(AppThemeContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLocationLogs());
  }, []);

  const refetchData = () => {
    dispatch(fetchLocationLogs());
  };

  const renderUserCell = ({item}: {item: LocationLog}) => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>{item.locationName}</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>{item.counter}</Text>
          </View>
        </View>
        <Section />
      </View>
    );
  };

  const extractKey = (item: LocationLog) => item.locationName;
  const styles = StyleSheet.create({
    container: {flexDirection: 'row'},
    cellContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    headerText: {color: theme.textColor, fontWeight: 'bold'},
    cellText: {color: theme.textColor},
  });
  const renderHeader = () => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Location</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Times visited</Text>
          </View>
        </View>
        <Section />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.backgroundColor,
        }}>
        <LottieView
          source={require('../../lotties/changing_weather.json')}
          speed={1.5}
          autoPlay={true}
        />
      </View>
    );
  }
  return (
    <ScreenWrapper navigation={navigation}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchData} />
        }
        ListHeaderComponent={renderHeader()}
        data={locationLogs}
        renderItem={renderUserCell}
        keyExtractor={extractKey}
      />
    </ScreenWrapper>
  );
};
