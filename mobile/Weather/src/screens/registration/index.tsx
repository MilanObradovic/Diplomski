import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppThemeContext} from '../../context/theme';
import Button from '../../components/button';
import {registerUser} from '../../redux/modules/user';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {selectSignupErrorMessage} from '../../redux/selectors/user';
import {useSelector} from 'react-redux';
import {resetSignupErrorMessage} from '../../redux/reducers/user';
import ScreenWrapper from '../../components/screenWrapper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export const RegistrationScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPassword1Hidden, setIsPassword1Hidden] = useState(true);
  const [isPassword2Hidden, setIsPassword2Hidden] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const {theme} = useContext(AppThemeContext);
  const signupErrorMessage = useSelector(selectSignupErrorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetSignupErrorMessage);
    return () => {
      dispatch(resetSignupErrorMessage);
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
  const onPassword2Change = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (passwordError !== '') {
      setPasswordError('');
    }
    setPassword2(e.nativeEvent.text);
  };
  const onRegisterPress = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long!');
      return;
    }
    if (password !== password2) {
      setPasswordError('Passwords must match!');
      return;
    }
    dispatch(registerUser({username, password}));
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
              marginBottom: 16,
            }}
            placeholderTextColor={theme.textColor}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
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
                width: '90%',
                marginTop: 16,
              }}
              secureTextEntry={isPassword1Hidden}
              placeholderTextColor={theme.textColor}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsPassword1Hidden(!isPassword1Hidden);
              }}>
              <FontAwesomeIcon
                icon={isPassword1Hidden ? faEye : faEyeSlash}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder={'Confirm password'}
              value={password2}
              onChange={onPassword2Change}
              style={{
                height: 40,
                backgroundColor: theme.gray,
                borderRadius: 8,
                color: theme.textColor,
                paddingHorizontal: 16,
                width: '90%',
                marginTop: 16,
                marginBottom: 8,
              }}
              placeholderTextColor={theme.textColor}
              secureTextEntry={isPassword2Hidden}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsPassword2Hidden(!isPassword2Hidden);
              }}>
              <FontAwesomeIcon
                icon={isPassword2Hidden ? faEye : faEyeSlash}
                size={24}
              />
            </TouchableOpacity>
          </View>

          {passwordError !== '' && (
            <Text style={{color: theme.danger, marginBottom: 32}}>
              {passwordError}
            </Text>
          )}
          {signupErrorMessage && (
            <Text style={{color: theme.danger, marginBottom: 32}}>
              {signupErrorMessage}
            </Text>
          )}
        </View>
        <View>
          <Button
            text={'Register'}
            isOutlined={false}
            onPress={onRegisterPress}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
