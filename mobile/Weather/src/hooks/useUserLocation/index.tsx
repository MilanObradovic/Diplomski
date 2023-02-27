// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {Alert} from 'react-native';
import {isiOSPlatform} from '../../utils';

export type GeoPoint = {
  latitude: number;
  longitude: number;
};

type PermissionResultType =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited'
  | 'never_ask_again';

const handleLocationResponse = async ({
  result,
  successCallback,
  blockedCallback = () => {},
}: {
  result: PermissionResultType;
  successCallback: (info: GeoPoint) => void;
  blockedCallback?: () => void;
}) => {
  switch (result) {
    case RESULTS.GRANTED:
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;
          successCallback({latitude, longitude});
        },
        () => {},
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 5},
      );
      return;
    case RESULTS.DENIED:
    case RESULTS.BLOCKED:
      blockedCallback();
      break;
    default:
      break;
  }
};

const showSettingsAlert = () => {
  Alert.alert(
    'Location permission',
    'Using device location is not allowed. Open settings to allow it.',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Open settings',
        onPress: openSettings,
      },
    ],
  );
};

const handleLocationPermission = (
  permissionName:
    | typeof PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    | typeof PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  successCallback: (info: GeoPoint) => void,
  blockedCallback?: () => void,
) => {
  check(permissionName).then(result => {
    switch (result) {
      case RESULTS.GRANTED:
        handleLocationResponse({result, successCallback, blockedCallback});
        break;
      case RESULTS.BLOCKED:
        showSettingsAlert();
        break;
      case RESULTS.DENIED:
        request(permissionName).then(result => {
          handleLocationResponse({result, successCallback, blockedCallback});
        });
        break;
      default:
        break;
    }
  });
};

export const requestLocation = ({
  successCallback,
  blockedCallback,
}: {
  successCallback: (info: GeoPoint) => void;
  blockedCallback?: () => void;
}) => {
  if (isiOSPlatform()) {
    handleLocationPermission(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      successCallback,
      blockedCallback,
    );
  } else {
    handleLocationPermission(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      successCallback,
      blockedCallback,
    );
  }
};
