import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.small,
    backgroundColor: COLORS.offwhite,
  },
  box: {
    position: 'absolute',
    right: SIZES.small,
    bottom: SIZES.small,
  },
});

export default styles;
