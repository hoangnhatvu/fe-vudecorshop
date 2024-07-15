import {View, Text, Image} from 'react-native';
import React from 'react';
import {formatCurrency} from '../../helpers/formatCurrency';
import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const ProductTemplateItem = ({item}) => {
  const {color, size} = item?.option || {};

  const optionText =
    color && size ? `${color}, ${size}` : color ? color : size && size;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={
            item?.option?.option_image
              ? {uri: item?.option?.option_image}
              : require('../../../assets/images/no_image.png')
          }
          style={styles.productImg}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.productTitle}>
          {item?.product?.product_name}
        </Text>
        {optionText && <Text style={styles.option}>{optionText}</Text>}
        <Text style={styles.option}>
          {formatCurrency(item?.option?.price)} x {item?.quantity}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: SIZES.small,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 2,
  },
  image: {
    marginLeft: SIZES.small,
    width: 75,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 75,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'OpenSans-Bold',
    color: COLORS.primary,
  },
  option: {
    fontSize: SIZES.small + 2,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.gray,
    marginTop: 1,
  },
  actionContainer: {
    paddingRight: SIZES.small,
    alignItems: 'flex-end',
  },
  quantityText: {
    color: COLORS.gray,
    fontFamily: 'OpenSans-Medium',
    marginHorizontal: SIZES.xSmall,
  },
});

export default ProductTemplateItem;
