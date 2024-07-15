import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {Button, Heading, ProductTemplateItem} from '../../components';
import {useDispatch} from 'react-redux';
import {addOrderItem, setListOrderItem} from '../../redux/slices/listOrderItem.slice';
import {getUserData} from '../../helpers/userDataManager';

const TemplateDetail = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const checkLogin = async (total) => {
    const user = await getUserData();
    if (!user) {
      loginAlert();
    } else {
      navigation.navigate('Payment', {total});
    }
  };

  const loginAlert = () => {
    Alert.alert(
      'Bạn chưa đăng nhập',
      'Để tiến hành đặt hàng vui lòng đăng nhập !',
      [
        {
          text: 'Hủy',
          onPress: () => {},
        },
        {
          text: 'Đồng ý',
          onPress: () => navigation.navigate('Login'),
        },
      ],
    );
  };

  const handleBuy = () => {
    dispatch(setListOrderItem())
    let total = 0;
    item?.products.forEach(element => {
      total = total + element?.option?.price * element?.quantity;
      dispatch(
        addOrderItem({
          id: element?.product?.id + element?.option?.id,
          product_id: element?.product?.id,
          option: element?.option,
          productName: element?.product?.product_name,
          price: element?.option?.price,
          size: element?.option?.size,
          color: element?.option?.size,
          categoryName: element?.product?.category?.category_name,
          image: element?.option?.option_image
            ? element?.option?.option_image
            : element?.product?.product_image,
          quantity: element?.quantity,
        }),
      );
    });
    checkLogin(total);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading
        navigation={navigation}
        text="Mẫu thiết kế"
        handleBack={() => {}}
      />
      <ScrollView>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{item?.template_name}</Text>
        </View>
        <Image
          source={
            item?.template_image
              ? {uri: item?.template_image}
              : require('../../../assets/images/no_image.png')
          }
          style={styles.image}
        />
        <Text style={styles.content}>{item?.description}</Text>
        <Text style={styles.subTitle}>Thiết kế bao gồm</Text>
        <View style={{gap: 5, marginBottom: SIZES.small}}>
          {item?.products?.map((item, index) => {
            return <ProductTemplateItem item={item} key={index} />;
          })}
        </View>
      </ScrollView>
      <Button title="Mua ngay" loader={loader} onPress={() => handleBuy()} />
    </SafeAreaView>
  );
};

export default TemplateDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.offwhite,
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    marginBottom: SIZES.small,
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: SIZES.large,
  },
  subTitle: {
    fontFamily: 'OpenSans-Bold',
    marginBottom: SIZES.small,
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  image: {
    marginTop: SIZES.xLarge,
    width: '100%',
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    fontFamily: 'OpenSans-Regular',
    fontSize: SIZES.medium,
    marginVertical: SIZES.medium,
  },
});
