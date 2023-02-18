import React, {useContext, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {disableUser, fetchAllUsers} from '../../redux/modules/user';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import LottieView from 'lottie-react-native';
import {
  selectAllUsers,
  selectIsLoadingAllUsers,
} from '../../redux/selectors/admin';
import {AppThemeContext} from '../../context/theme';
import {User} from '../../types';
import Section from '../../components/section';
import moment from 'moment';
import ScreenWrapper from '../../components/screenWrapper';
import Button from '../../components/button';
import {setIsActive} from '../../redux/reducers/admin';

export const UserDashboardScreen = ({navigation}) => {
  const isLoading = useSelector(selectIsLoadingAllUsers);
  const users = useSelector(selectAllUsers);
  const {theme} = useContext(AppThemeContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const refetchData = () => {
    dispatch(fetchAllUsers());
  };

  const renderUserCell = ({item}: {item: User}) => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>{item.username}</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>
              {moment(item.dateCreated).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>{item.role}</Text>
          </View>
          <View style={styles.cellContainer}>
            <Switch
              value={!item.isDisabled}
              onValueChange={newValue => {
                Alert.alert(
                  `Are you sure you want to ${
                    newValue ? 'activate' : 'deactivate'
                  } user ${item?.username}?`,
                  '',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        dispatch(
                          disableUser({
                            username: item!.username,
                            isActive: newValue,
                          }),
                        ).then(response => {
                          if (response.payload.status === 200) {
                            dispatch(
                              setIsActive({
                                username: item.username,
                                isActive: newValue,
                              }),
                            );
                          }
                          Alert.alert(response?.payload?.data);
                        });
                      },
                    },
                    {text: 'Cancel', style: 'cancel'},
                  ],
                );
              }}
              thumbColor={theme.primary}
            />
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>
              {moment(item.lastActivity).format('DD-MM-YY, HH:MM')}
            </Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>{item.apiAccessCounter}</Text>
          </View>
        </View>
        <Section />
      </View>
    );
  };

  const extractKey = (item: User) => item.username;
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
            <Text style={styles.headerText}>Username</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Date created</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Type</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Is active</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Last activity</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.headerText}>Api counter</Text>
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
      <Button text={'Refetch user data'} onPress={refetchData} />
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={users}
        renderItem={renderUserCell}
        keyExtractor={extractKey}
      />
    </ScreenWrapper>
  );
};
