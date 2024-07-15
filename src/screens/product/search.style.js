import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.offwhite,
    paddingHorizontal: SIZES.small,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    paddingHorizontal: 10,
    paddingStart: SIZES.small,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  closeIcon: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    zIndex: -1,
  },
  searchInput: {
    fontFamily: 'OpenSans-Regular',
    width: '100%',
    height: '100%',
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {},
  image: {
    height: 50,
    width: 50,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
});
export default styles;
