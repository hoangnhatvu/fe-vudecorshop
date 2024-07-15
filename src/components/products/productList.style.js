import {StyleSheet} from 'react-native';
import {SIZES} from '../../../constants';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    paddingTop: SIZES.large,
    width: SIZES.width,
    paddingHorizontal: SIZES.small
  },
  separator: {
    height: 16,
  },
});

export default styles;
