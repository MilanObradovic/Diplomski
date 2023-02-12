import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppThemeContext} from '../../context/theme';
import Button from '../../components/button';
import {loginUser} from '../../redux/modules/user';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {selectLoginErrorMessage} from '../../redux/selectors/user';
import {useSelector} from 'react-redux';
import {resetLoginErrorMessage} from '../../redux/reducers/user';

export const LoginScreen = props => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {theme} = useContext(AppThemeContext);
  const loginErrorMessage = useSelector(selectLoginErrorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetLoginErrorMessage);
    return () => {
      dispatch(resetLoginErrorMessage);
    };
  });
  const onUsernameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setUsername(e.nativeEvent.text);
  };
  const onPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (passwordError !== '') {
      setPasswordError('');
    }
    setPassword(e.nativeEvent.text);
  };
  const onLoginPress = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    dispatch(loginUser({username, password}));
  };
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingBottom: 32,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.backgroundColor,
      }}>
      <View>
        <TextInput
          placeholder={'Username'}
          value={username}
          onChange={onUsernameChange}
          style={{
            height: 40,
            backgroundColor: theme.gray,
            borderRadius: 8,
            color: theme.textColor,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 32,
          }}
          placeholderTextColor={theme.textColor}
        />
        <TextInput
          placeholder={'Password'}
          value={password}
          onChange={onPasswordChange}
          style={{
            height: 40,
            backgroundColor: theme.gray,
            borderRadius: 8,
            color: theme.textColor,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 16,
            marginBottom: 8,
          }}
          placeholderTextColor={theme.textColor}
        />
        {passwordError !== '' && (
          <Text style={{color: theme.danger, marginBottom: 32}}>
            {passwordError}
          </Text>
        )}
        {loginErrorMessage && (
          <Text style={{color: theme.danger, marginBottom: 32}}>
            {loginErrorMessage}
          </Text>
        )}
      </View>
      <View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: theme.primary,
              marginBottom: 32,
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              navigation.navigate('Sign up');
            }}>
            Don't have an accout? Sign up now!
          </Text>
        </View>
        <Button text={'Login'} isOutlined={false} onPress={onLoginPress} />
      </View>
    </View>
  );
};
