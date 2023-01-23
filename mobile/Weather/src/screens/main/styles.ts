import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 40,
  },
  chartContainer: {
    height: 220,
    left: '-10%',
    width: '125%',
  },
  chartScrollViewContainer: {
    alignItems: 'flex-end',
  },
  chartHidingView: {
    position: 'absolute',
    height: 75,
    width: 50,
    zIndex: 2,
    top: 0,
  },
  chart: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  chartDotContent: {
    position: 'absolute',
    fontWeight: 'bold',
  },
});
