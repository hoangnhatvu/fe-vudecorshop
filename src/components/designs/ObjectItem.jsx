import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const ObjectItem = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress(item)}>
      <View style={styles.productContainer}>
        <View style={styles.image}>
          <Image
            source={{uri: item?.product_image}}
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productTitle}>
            {item?.product_name}
          </Text>
          <Text style={styles.category}>{item?.category?.category_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ObjectItem;

const styles = StyleSheet.create({
    container: {
      borderRadius: SIZES.small,
      backgroundColor: COLORS.white,
      elevation: 2,
      margin: 2,
    },
    productContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: SIZES.small,
      borderBottomWidth: 0.5,
      borderBottomColor: COLORS.gray2,
    },
    image: {
      marginLeft: SIZES.small,
      width: 50,
      backgroundColor: COLORS.secondary,
      borderRadius: SIZES.medium,
      justifyContent: 'center',
      alignContent: 'center',
    },
    productImg: {
      width: '100%',
      height: 50,
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
    category: {
      fontSize: SIZES.small + 2,
      fontFamily: 'OpenSans-Regular',
      color: COLORS.gray,
      marginTop: 1,
    },
  });
