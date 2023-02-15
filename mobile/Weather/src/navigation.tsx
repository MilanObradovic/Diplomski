import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useContext, useEffect} from 'react';
import MainScreen from './screens/main';
import SettingsScreen from './screens/settings';
import {AppThemeContext} from './context/theme';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './screens/search';
import {Alert} from 'react-native';

import {LoginScreen} from './screens/login';
import {RegistrationScreen} from './screens/registration';
import {useSelector} from 'react-redux';
import {selectIsUserLoggedIn, selectUser} from './redux/selectors/user';
import {logout} from './redux/reducers/user';
import {useAppDispatch} from './hooks/useAppDispatch';
import {fetchBookmarksForUser} from './redux/modules/bookmark';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const Navigation = () => {
  const {theme} = useContext(AppThemeContext);
  const {textColor, backgroundColor, primary} = theme;
  const headerStyle = {
    backgroundColor,
  };
  const dispatch = useAppDispatch();

  const userData = useSelector(selectUser);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchBookmarksForUser({userId: userData!.username}));
    }
  }, []);

  const MainStackNavigator = () => (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Main'} component={MainScreen} />
        <Stack.Screen name={'Search'} component={SearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Log in'} component={LoginScreen} />
        <Stack.Screen name={'Sign up'} component={RegistrationScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: primary,
          drawerInactiveTintColor: textColor,
          drawerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: primary,
        }}
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              {isUserLoggedIn && (
                <DrawerItem
                  inactiveTintColor={theme.danger}
                  label="Logout"
                  onPress={() => {
                    Alert.alert(
                      `Are you sure you want to log out, ${userData?.username}?`,
                      '',
                      [
                        {
                          text: 'Yes',
                          onPress: () => {
                            props.navigation.navigate('Log in');
                            dispatch(logout());
                          },
                        },
                        {text: 'Cancel', style: 'cancel'},
                      ],
                    );
                  }}
                />
              )}
            </DrawerContentScrollView>
          );
        }}>
        <Drawer.Screen
          options={{
            headerStyle,
          }}
          name={'Home'}
          component={MainStackNavigator}
        />
        <Drawer.Screen name={'Settings'} component={SettingsScreen} />
        {/*//if logged out, show Log in button that navigates to login screen*/}
        {!isUserLoggedIn && (
          <Drawer.Screen
            options={{
              headerStyle,
            }}
            name={'Log in'}
            component={AuthStack}
          />
        )}
        {/*{!isUserLoggedIn && (*/}
        {/*  <Drawer.Screen name={'Sign up'} component={RegistrationScreen} />*/}
        {/*)}*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
