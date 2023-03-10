import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {selectAlerts} from '../../redux/selectors/alerts';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Alert} from '../../types';
import {AppThemeContext} from '../../context/theme';
import {getRGBFromHexWithOpacity} from '../../utils';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const styles = StyleSheet.create({
  alertContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#f5a442',
    backgroundColor: getRGBFromHexWithOpacity('#f5a442', 0.3),
    borderRadius: 16,
    marginBottom: 8,
  },
  alertsContainer: {paddingTop: 8, paddingHorizontal: 8},
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
});

export const AlertComponent = ({
  onAlertPress,
}: {
  onAlertPress: (item: Alert) => void;
}) => {
  const alerts = useSelector(selectAlerts);
  const {theme} = useContext(AppThemeContext);
  const renderAlert = ({item}: {item: Alert}) => (
    <TouchableOpacity
      onPress={() => {
        onAlertPress(item);
      }}
      style={styles.alertContainer}>
      <Text
        style={{color: theme.textColor, paddingBottom: 8, fontWeight: 'bold'}}>
        {item?.headline}
      </Text>
      {item?.event && (
        <Text
          style={{
            color: theme.textColor,
            paddingBottom: 8,
            fontWeight: 'bold',
          }}>
          {item?.event}
        </Text>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: theme.textColor, flex: 1}} numberOfLines={2}>
          {item?.desc}
        </Text>
        <FontAwesomeIcon
          color={theme.primary}
          icon={faAngleDoubleRight}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );

  const extractKey = (item: Alert) => item.headline;

  if (alerts.length === 0) {
    return null;
  }
  return (
    <View style={styles.alertsContainer}>
      <Text
        style={[
          styles.title,
          {color: theme.textColor, fontSize: theme.fontSize.lg},
        ]}>
        Alerts
      </Text>
      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={extractKey}
      />
    </View>
  );
};
