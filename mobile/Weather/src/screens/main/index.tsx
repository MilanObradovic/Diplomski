import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState, useRef} from 'react';
import LottieView from 'lottie-react-native';
import ScreenWrapper from '../../components/screenWrapper';
import {useSelector} from 'react-redux';
import {AppThemeContext} from '../../context/theme';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import moment from 'moment';
import {
  selectCurrentTemperature,
  selectFeelsLike,
  selectFutureDays,
  selectFutureHourlyData,
  selectIsWeatherInitializing,
  selectTodaysMaxAndMin,
} from '../../redux/selectors/weather';
import {RootReducerType} from '../../redux/reducers';
import DayCard from '../../components/dayCard';
import {
  getHourCopyFromMilitaryCopy,
  getInitialScrollHourIndex,
  getRGBFromHex,
  getWeatherIconFromDescription,
} from '../../utils';
import {LineChart} from 'react-native-chart-kit';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {styles} from './styles';
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  selectCurrentLocation,
  selectLocationName,
} from '../../redux/selectors/currentLocation';
import {
  addBookmarkLocally,
  removeBookmarkLocally,
} from '../../redux/reducers/bookmark';
import {selectIsLocationBookmarked} from '../../redux/selectors/bookmark';
import {StackScreenProps} from '@react-navigation/stack';
import {Modalize} from 'react-native-modalize';
import SearchScreen from '../search';
import {selectUnitType} from '../../redux/selectors/settings';
import {UNIT_METRIC} from '../../redux/reducers/unit';
import CurrentDayDetails from '../../components/currentDayDetails';
import {
  removeBookmark,
  saveBookmark,
  sendNotification,
} from '../../redux/modules/bookmark';
import {selectUser, selectIsUserLoggedIn} from '../../redux/selectors/user';
import AirQuality from '../../components/airQuilitySection';
import {AlertComponent} from '../../components/alert';
import {Alert} from '../../types';

export type MainStackParamList = {
  Main: undefined;
};
type Props = StackScreenProps<MainStackParamList, 'Main'>;

function MainScreen({navigation}: Props) {
  const bottomSheetRef = useRef(null);
  const alertBottomSheetRef = useRef(null);
  const [selectedDayCard, setSelectedDayCard] = useState<number>(0);
  const [openedAlert, setOpenedAlert] = useState<Alert | null>();

  const unitType = useSelector(selectUnitType);
  const {theme} = useContext(AppThemeContext);

  const user = useSelector(selectUser);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  const isWeatherInitializing = useSelector(selectIsWeatherInitializing);
  const currentTemperature = useSelector((state: RootReducerType) =>
    selectCurrentTemperature(state, unitType),
  );
  const feelsLike = useSelector((state: RootReducerType) =>
    selectFeelsLike(state, unitType),
  );
  const {max, min} = useSelector((state: RootReducerType) =>
    selectTodaysMaxAndMin(state, unitType, selectedDayCard),
  );

  const {currentLocation, type} = useSelector(selectCurrentLocation);
  const nameOfTheLocation = useSelector(selectLocationName);

  const currentLocationName =
    type === 'location' ? currentLocation?.locationName : nameOfTheLocation;

  const isCurrentLocationBookmarked = useSelector((state: RootReducerType) =>
    selectIsLocationBookmarked(state, currentLocationName),
  );

  const futureHourlyData = useSelector(selectFutureHourlyData);
  const futureDaysData = useSelector(selectFutureDays);

  const dispatch = useAppDispatch();

  const renderLoadingScreen = () => {
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
  };

  const renderCurrentCondition = () => {
    const weatherLottie = getWeatherIconFromDescription(
      futureHourlyData[selectedDayCard][11].weatherDesc[0].value,
      selectedDayCard === 0,
    );
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 32,
          paddingBottom: 8,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginBottom: 16,
              fontSize: 18,
              color: theme.textColor,
            }}>
            {moment(futureDaysData[selectedDayCard].date).format('ddd, MMM D')}
          </Text>

          <Text
            style={{marginBottom: 16, fontSize: 18, color: theme.textColor}}>
            &uarr; {max}&deg; &darr; {min}&deg;{' '}
            {unitType === UNIT_METRIC ? 'C' : 'F'}
          </Text>
          {selectedDayCard === 0 && (
            <Text
              style={{marginBottom: 8, fontSize: 64, color: theme.textColor}}>
              {currentTemperature}&deg;{unitType === UNIT_METRIC ? 'C' : 'F'}
            </Text>
          )}
          {selectedDayCard === 0 && (
            <Text
              style={{marginBottom: 16, fontSize: 18, color: theme.textColor}}>
              Feels like {feelsLike}&deg;
            </Text>
          )}
          <Text
            style={{
              fontSize: 18,
              color: theme.textColor,
              marginBottom: 16,
            }}>
            {futureHourlyData[selectedDayCard][11].weatherDesc[0].value}
          </Text>
        </View>
        <View style={{flex: 1}}>{weatherLottie}</View>
      </View>
    );
  };

  const onDayCardPress = (index: number) => {
    setSelectedDayCard(index);
  };

  const renderNextDaysCard = ({item}: {item: number}) => {
    if (futureDaysData) {
      return (
        <DayCard
          day={futureDaysData[item]}
          index={item}
          isSelected={selectedDayCard === item}
          onPress={onDayCardPress}
        />
      );
    }
    return null;
  };

  const getItemLayout = (data: number[] | null | undefined, index: number) => {
    return {
      index,
      offset: 78 * index,
      length: 78,
    };
  };

  const renderNextDaysList = () => {
    return (
      <FlatList
        data={futureDaysData?.map((_, index) => {
          return index;
        })}
        contentContainerStyle={{paddingHorizontal: 16}}
        renderItem={renderNextDaysCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
      />
    );
  };

  const renderCurrentDayDetails = () => {
    return (
      <View>
        <CurrentDayDetails />
        {isUserLoggedIn && <AirQuality />}
      </View>
    );
  };

  const onBookmarkPress = () => {
    dispatch(sendNotification());
    if (isCurrentLocationBookmarked) {
      if (isUserLoggedIn) {
        dispatch(
          removeBookmark({
            userId: user!.username,
            locationName: currentLocationName,
          }),
        );
      } else {
        dispatch(removeBookmarkLocally(currentLocationName));
      }
    } else {
      if (isUserLoggedIn) {
        dispatch(
          saveBookmark({
            userId: user?.username,
            locationName: currentLocationName,
            q: currentLocationName,
          }),
        );
      } else {
        dispatch(
          addBookmarkLocally({
            id: currentLocationName,
            locationName: currentLocationName,
          }),
        );
      }
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: theme.fontSize.lg,
            color: theme.textColor,
            paddingHorizontal: 50,
            textAlign: 'center',
          }}>
          {currentLocationName}
        </Text>
        {/*bookmark (star) icon*/}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{position: 'absolute', left: 16, zIndex: 2}}
          onPress={onBookmarkPress}>
          <FontAwesomeIcon
            color={'#FFC82F'}
            icon={isCurrentLocationBookmarked ? faStar : faStarRegular}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderWeather = () => {
    getInitialScrollHourIndex();
    return (
      <View style={{paddingHorizontal: 16}}>{renderCurrentCondition()}</View>
    );
  };

  const getChartLabels = () => {
    let result: string[] = [];
    if (futureHourlyData) {
      result = futureHourlyData[selectedDayCard].map((_, index) => {
        return getHourCopyFromMilitaryCopy(
          futureHourlyData[selectedDayCard][index].time,
        );
      });
      result.push('');
      result.unshift('');
    }
    return result;
  };

  const getChartValues = () => {
    let result: number[] = [];
    if (futureHourlyData) {
      result = futureHourlyData[selectedDayCard].map((_, index) => {
        return parseInt(
          futureHourlyData[selectedDayCard][index][
            unitType === UNIT_METRIC ? 'tempC' : 'tempF'
          ],
          10,
        );
      });
      result.push(
        parseInt(
          futureHourlyData[selectedDayCard][23][
            unitType === UNIT_METRIC ? 'tempC' : 'tempF'
          ],
          10,
        ),
      );
      result.unshift(
        parseInt(
          futureHourlyData[selectedDayCard][0][
            unitType === UNIT_METRIC ? 'tempC' : 'tempF'
          ],
          10,
        ),
      );
    }
    return result;
  };

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
        <SearchScreen />
      </Modalize>
    );
  };

  // this adds element to chart which is smaller from min as much as min is smaller from max
  // that makes min value in the middle of the chart
  const valueToMakeChartPretty = 2 * min - max;

  const data: LineChartData = {
    labels: getChartLabels(),
    datasets: [
      {
        data: getChartValues(),
      },
      {
        data: [valueToMakeChartPretty],
      },
    ],
  };

  const renderChartDotContent = ({
    x,
    y,
    index,
    indexData,
  }: {
    x: number;
    y: number;
    index: number;
    indexData: number;
  }) => {
    if (
      parseInt(String(indexData), 10) === valueToMakeChartPretty ||
      index === 0 ||
      index === 25
    ) {
      return null;
    }
    return (
      <Text
        style={[
          styles.chartDotContent,
          {
            top: y - 25,
            left: x - 10,
            color: theme.textColor,
          },
        ]}>
        {indexData}&deg;
      </Text>
    );
  };

  const renderLineChart = () => (
    <View style={styles.chartContainer}>
      <ScrollView
        contentContainerStyle={styles.chartScrollViewContainer}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        horizontal={true}>
        {/*<View*/}
        {/*  style={[*/}
        {/*    styles.chartHidingView,*/}
        {/*    {backgroundColor: theme.backgroundColor},*/}
        {/*  ]}*/}
        {/*/>*/}
        <LineChart
          chartConfig={{
            color: () => getRGBFromHex(theme.primary),
            backgroundColor: theme.backgroundColor,
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            strokeWidth: 3,
            fillShadowGradientOpacity: 0.5,
            propsForDots: {
              opacity: 0,
            },
          }}
          data={data}
          width={1000}
          height={200}
          bezier={true}
          renderDotContent={renderChartDotContent}
          withInnerLines={false}
          withOuterLines={false}
          style={styles.chart}
          withHorizontalLabels={false}
        />
      </ScrollView>
    </View>
  );
  if (isWeatherInitializing || !futureHourlyData) {
    return renderLoadingScreen();
  }

  const renderFullAlertProperty = (
    title: string,
    value: string | undefined,
  ) => {
    if (!value) {
      return null;
    }
    return (
      <View style={{marginBottom: 8}}>
        <Text style={{color: theme.textColor}}>
          <Text style={{fontWeight: 'bold', fontSize: theme.fontSize.md}}>
            {title}:{'\n'}
          </Text>
          <Text>{value}</Text>
        </Text>
      </View>
    );
  };
  const renderFullAlert = () => {
    return (
      <View>
        <Text
          style={{
            color: theme.textColor,
            paddingBottom: 8,
            fontWeight: 'bold',
            fontSize: theme.fontSize.lg,
          }}>
          {openedAlert?.headline}
        </Text>
        {renderFullAlertProperty('Instructions', openedAlert?.instruction)}
        {renderFullAlertProperty(
          'Effective',
          openedAlert?.effective.replace('T', ' ').replace(/\+.*/, ' ($& )'),
        )}
        {renderFullAlertProperty(
          'Expires',
          openedAlert?.expires.replace('T', ' ').replace(/\+.*/, ' ($& )'),
        )}
        {renderFullAlertProperty('Description', openedAlert?.desc)}
      </View>
    );
  };

  const renderAlertBottomSheet = () => {
    return (
      <Modalize
        ref={alertBottomSheetRef}
        withHandle
        modalTopOffset={64}
        childrenStyle={{paddingHorizontal: 16, paddingVertical: 16}}
        modalStyle={{backgroundColor: theme.backgroundColor}}
        adjustToContentHeight
        snapPoint={Dimensions.get('screen').height / 2}
        disableScrollIfPossible>
        {renderFullAlert()}
      </Modalize>
    );
  };
  if (!currentLocation) {
    return <Text>Waiting for location access</Text>;
  }
  return (
    <ScreenWrapper navigation={navigation}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {!isWeatherInitializing && renderHeader()}
        {!isWeatherInitializing && (
          <AlertComponent
            onAlertPress={item => {
              alertBottomSheetRef?.current?.open();
              setOpenedAlert(item);
            }}
          />
        )}
        {!isWeatherInitializing && renderWeather()}
        {!isWeatherInitializing && renderLineChart()}
        <View style={{padding: 16}}>
          {/*<Section style={{marginVertical: 16}} />*/}
        </View>
        {!isWeatherInitializing && renderNextDaysList()}
        {!isWeatherInitializing && renderCurrentDayDetails()}
      </ScrollView>
      {renderSearchInputAndResults()}
      {renderAlertBottomSheet()}
    </ScreenWrapper>
  );
}
export default MainScreen;
