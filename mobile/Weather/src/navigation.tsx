import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import MainScreen from './screens/main';
import SettingsScreen from './screens/settings';
import {AppThemeContext} from './context/theme';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './screens/search';
import {TouchableOpacity, View} from 'react-native';

import {faSadTear} from '@fortawesome/free-regular-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const Navigation = () => {
  const {theme} = useContext(AppThemeContext);
  const {textColor, backgroundColor, primary} = theme;
  const headerStyle = {
    backgroundColor,
  };
  const mainStackNavigator = () => (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Main'} component={MainScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Search'} component={SearchScreen} />
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
        }}>
        <Drawer.Screen
          options={{
            headerStyle,
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => {
            //       console.log('otvori search screen');
            //     }}>
            //     <FontAwesomeIcon
            //       color={primary}
            //       icon={faSearch}
            //       style={{marginRight: 16}}
            //     />
            //   </TouchableOpacity>
            // ),
          }}
          name={'WeatherApp'}
          component={mainStackNavigator}
        />
        <Drawer.Screen name={'Settings'} component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
