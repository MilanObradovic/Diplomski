import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {setIsActive} from '../../redux/reducers/admin';
import {Modalize} from 'react-native-modalize';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';

export const UserDashboardScreen = ({navigation}) => {
  const isLoading = useSelector(selectIsLoadingAllUsers);
  const users = useSelector(selectAllUsers);
  const {theme} = useContext(AppThemeContext);
  const dispatch = useAppDispatch();
  const userBottomSheet = useRef(null);
  const [userIndex, setUserIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const refetchData = () => {
    dispatch(fetchAllUsers());
  };

  const onSwitchPress = ({newValue, user}) => {
    Alert.alert(
      `Are you sure you want to ${newValue ? 'activate' : 'deactivate'} user ${
        user?.username
      }?`,
      '',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              disableUser({
                username: user!.username,
                isActive: newValue,
              }),
            ).then(response => {
              if (response.payload.status === 200) {
                dispatch(
                  setIsActive({
                    username: user.username,
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
  };

  const renderUserCell = ({item, index}: {item: User; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setUserIndex(index);
          userBottomSheet?.current?.open();
        }}>
        <View
          style={[
            styles.container,
            item.isDisabled
              ? {
                  backgroundColor: theme.gray,
                }
              : {},
          ]}>
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
        </View>
        <Section />
      </TouchableOpacity>
    );
  };

  const extractKey = (item: User) => item.username;
  const styles = StyleSheet.create({
    container: {flexDirection: 'row'},
    cellContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    headerText: {color: theme.textColor, fontWeight: 'bold'},
    cellText: {color: theme.textColor, fontSize: theme.fontSize.md},
    sheetCell: {
      flexDirection: 'row',
      padding: 8,
      justifyContent: 'space-between',
    },
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
        </View>
        <Section />
      </View>
    );
  };

  const renderFullBottomSheet = () => {
    const user = users[userIndex];
    return (
      <View style={{paddingVertical: 24}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faIdCard} size={40} color={theme.primary} />
        </View>
        <View style={styles.sheetCell}>
          <Text style={styles.headerText}>Username</Text>
          <Text style={[styles.headerText]}>{user.username}</Text>
        </View>
        <Section />
        <View style={styles.sheetCell}>
          <Text style={styles.headerText}>Type</Text>
          <Text style={styles.headerText}>{user.role}</Text>
        </View>
        <Section />
        <View style={styles.sheetCell}>
          <Text style={styles.headerText}>Is active</Text>
          <Switch
            value={!user.isDisabled}
            onValueChange={newValue => {
              onSwitchPress({newValue, user});
            }}
            thumbColor={theme.primary}
          />
        </View>
        <Section />
        <View style={styles.sheetCell}>
          <Text style={styles.headerText}>Api access counter</Text>
          <Text style={styles.headerText}>{user.apiAccessCounter}</Text>
        </View>
        <Section />
        <View style={styles.sheetCell}>
          <Text style={styles.headerText}>Date created</Text>
          <Text style={styles.headerText}>
            {moment(user.dateCreated).format('DD-MM-YYYY')}
          </Text>
        </View>
        <Section />
        <View style={styles.sheetCell}>
          <Text style={styles.headerText}>Date created</Text>
          <Text style={styles.headerText}>
            {moment(user.lastActivity).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    );
  };
  const renderUserBottomSheet = () => {
    return (
      <Modalize
        ref={userBottomSheet}
        withHandle
        modalTopOffset={64}
        childrenStyle={{paddingHorizontal: 16, paddingVertical: 16}}
        modalStyle={{backgroundColor: theme.backgroundColor}}
        adjustToContentHeight
        snapPoint={Dimensions.get('screen').height / 2}
        disableScrollIfPossible>
        {renderFullBottomSheet()}
      </Modalize>
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
        data={users}
        renderItem={renderUserCell}
        keyExtractor={extractKey}
      />
      {renderUserBottomSheet()}
    </ScreenWrapper>
  );
};
