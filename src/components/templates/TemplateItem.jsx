import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOWS, SIZES} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const TemplateItem = ({item}) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate.navigate('TemplateDetail', {item})}>
      <Image
        source={
          item?.template_image
            ? {uri: item?.template_image}
            : require('../../../assets/images/no_image.png')
        }
        style={styles.image}
      />
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.title}>
          {item?.template_name}
        </Text>
        <Text numberOfLines={4} style={styles.content}>
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TemplateItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xLarge,
    backgroundColor: COLORS.secondary,
    elevation: 2
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: SIZES.small,
    borderTopRightRadius: SIZES.small,
    resizeMode: 'contain',
  },
  textWrapper: {
    marginTop: 8,
    paddingHorizontal: SIZES.small,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    marginBottom: 4,
    color: COLORS.primary,
    fontSize: SIZES.large,
  },
  content: {
    fontFamily: 'OpenSans-Regular',
    fontSize: SIZES.small + 1,
  },
});
