import {
  Alert,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppThemeContext} from '../../context/theme';
import Button from '../../components/button';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {selectUser} from '../../redux/selectors/user';
import {useSelector} from 'react-redux';
import {changePassword} from '../../redux/modules/user';

export const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePasswordStatusMessage, setChangePasswordStatusMessage] =
    useState('');
  const [passwordError, setPasswordError] = useState('');
  const {theme} = useContext(AppThemeContext);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(resetChangePasswordErrorMessage);
    return () => {
      // dispatch(resetChangePasswordErrorMessage);
    };
  });
  const onOldPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (passwordError !== '') {
      setPasswordError('');
    }
    if (changePasswordStatusMessage !== '') {
      setChangePasswordStatusMessage('');
    }
    setOldPassword(e.nativeEvent.text);
  };
  const onNewPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (passwordError !== '') {
      setPasswordError('');
    }
    if (changePasswordStatusMessage !== '') {
      setChangePasswordStatusMessage('');
    }
    setNewPassword(e.nativeEvent.text);
  };
  const onChangePasswordPress = () => {
    if (oldPassword.length < 8 || newPassword.length < 8) {
      setPasswordError('Passwords must be at least 8 characters long!');
      return;
    }
    if (oldPassword === newPassword) {
      setPasswordError('Passwords can not be the same!');
      return;
    }
    dispatch(
      changePassword({username: user!.username, oldPassword, newPassword}),
    ).then(r => {
      if (r?.payload?.status === 200) {
        Alert.alert(r?.payload?.data);
      } else {
        setChangePasswordStatusMessage(r?.payload?.data);
      }
    });
    //send request
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
        <Text
          style={{
            fontSize: theme.fontSize.lg,
            color: theme.textColor,
            marginBottom: 24,
          }}>
          Change password
        </Text>
        <TextInput
          placeholder={'Old password'}
          value={oldPassword}
          onChange={onOldPasswordChange}
          style={{
            height: 40,
            backgroundColor: theme.gray,
            borderRadius: 8,
            color: theme.textColor,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 16,
          }}
          placeholderTextColor={theme.textColor}
        />
        <TextInput
          placeholder={'New password'}
          value={newPassword}
          onChange={onNewPasswordChange}
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
        {changePasswordStatusMessage && (
          <Text style={{color: theme.danger, marginBottom: 32}}>
            {changePasswordStatusMessage}
          </Text>
        )}
      </View>
      <View>
        <Button
          text={'Change password'}
          isOutlined={false}
          onPress={onChangePasswordPress}
        />
      </View>
    </View>
  );
};
