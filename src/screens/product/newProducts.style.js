import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.offwhite,
  },
  wrapper: {
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    paddingHorizontal: SIZES.small,
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    marginBottom: SIZES.medium,
    zIndex: 999,
  },
  heading: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
    },
});

export default styles;
