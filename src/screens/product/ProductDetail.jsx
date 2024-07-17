import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, SIZES} from '../../../constants';
import styles from './productDetail.style';
import {useRoute} from '@react-navigation/native';
import CartManager from '../../helpers/cartManager';
import {formatCurrency} from '../../helpers/formatCurrency';
import {OptionsList, StarRating} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {setOptionProduct} from '../../redux/slices/optionProduct.slice';
import {useToastMessage} from '../../hook/showToast';
import {getReviewByProduct} from '../../helpers/handleReviewApis';

const ProductDetail = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(null);
  const {showToast} = useToastMessage();
  const optionProduct = useSelector(state => state.optionProduct.value);
  const [isLoading, setIsLoading] = useState(false);
  const [listReviews, setListReviews] = useState(null);
  const [averageRate, setAverageRate] = useState(0);
  const dispatch = useDispatch();
  const [cartNumber, setCartNumber] = useState(0);

  const loadData = async () => {
    const cartList = await CartManager.getCartItems();
    setCartNumber(cartList.length);
  };

  const warning = () => {
    Alert.alert(
      'Bạn chưa chọn thuộc tính sản phẩm !',
      'Vui lòng chọn thuộc tính cho sản phẩm',
      [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ],
    );
  };

  const getReviews = async () => {
    try {
      setIsLoading(true);
      const responseResult = await getReviewByProduct(item.id);
      console.log(item.id);
      setListReviews(responseResult?.data);
      if (responseResult?.data.length > 0) {
        const totalRate = responseResult?.data
          .map(review => review.rate)
          .reduce((acc, rate) => acc + rate, 0);
        const averageRateNumber = Number(
          (totalRate / responseResult?.data.length).toFixed(1),
        );
        setAverageRate(averageRateNumber);
      }
    } catch (error) {
      if (error?.message) {
        showToast(error?.message, 'danger');
      } else {
        showToast('Không tải được đánh giá sản phẩm !', 'danger');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
    loadData();
  }, []);

  useEffect(() => {
    setCount(1);
    setPrice(
      optionProduct
        ? formatCurrency(optionProduct.price)
        : formatCurrency(item.options[0].price) +
            ' - đ ' +
            formatCurrency(item.options[item.options.length - 1].price),
    );
  }, [optionProduct]);

  const increment = () => {
    if (item.options.length === 1) {
      dispatch(setOptionProduct(item.options[0]));
    }
    if (!optionProduct) {
      warning();
    } else {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const addCartHandle = async product => {
    if (item.options.length === 1) {
      dispatch(setOptionProduct(item.options[0]));
    }
    if (!optionProduct) {
      warning();
    } else {
      try {
        if (count > optionProduct.stock) {
          showToast('Vượt quá số lượng sản phẩm trong kho', 'warning');
        } else {
          await CartManager.addToCart(product, count, optionProduct);
          loadData();
          showToast('Đã thêm sản phẩm vào giỏ hàng !', 'success');
        }
      } catch (error) {
        showToast(`${error}`, 'danger');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcon name="chevron-back-circle" size={30} />
          </TouchableOpacity>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}> {cartNumber} </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={{
            uri: optionProduct
              ? optionProduct.option_image
              : item.product_image,
          }}
          style={styles.image}
        />
        <ScrollView style={styles.detailsWrapper}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.product_name}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ViroAR3DObjectPage', {item})}>
              <IonIcon
                name="cube-outline"
                size={36}
                color={COLORS.primary}
                fontFamily="OpenSans-Bold"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceWrapperRow}>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>đ {price}</Text>
            </View>
            <View style={styles.rating}>
              <TouchableOpacity onPress={() => increment()}>
                <SimpleLineIcons name="plus" size={20} />
              </TouchableOpacity>
              <Text style={styles.ratingText}>{count}</Text>
              <TouchableOpacity onPress={() => decrement()}>
                <SimpleLineIcons name="minus" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <OptionsList options={item.options} />
          </View>

          {optionProduct ? (
            <Text style={{marginTop: SIZES.small, marginLeft: 4}}>
              Số lượng còn lại: {optionProduct.stock}
            </Text>
          ) : null}

          <View style={styles.ratingRow}>
            {isLoading ? (
              <View>
                <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
              </View>
            ) : (
              <View style={styles.rating}>
                <StarRating averageRate={averageRate} size={24} />
                <Text style={styles.ratingText}>({averageRate})</Text>
              </View>
            )}
            <Text>Đã bán: {item.order_number}</Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Mô tả sản phẩm</Text>
            <Text style={styles.descText}>{item.description}</Text>
          </View>
          <View style={{marginBottom: SIZES.medium}}>
            <View style={styles.location}>
              <View style={{flexDirection: 'row'}}>
                <IonIcon name="location-outline" size={20} />
                <Text>HCM</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={20}
                />
                <Text style={{paddingLeft: 5}}>Free Ship</Text>
              </View>
            </View>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              Đánh giá sản phẩm ({listReviews?.length})
            </Text>
            <View style={{marginTop: SIZES.small}}>
              {listReviews?.map((item, index) => {
                return (
                  <View key={index} style={styles.ratingWrapper}>
                    <View style={styles.userWrapper}>
                      <View style={styles.imageUser}>
                        <Image
                          source={
                            item?.created_by?.user_image
                              ? {uri: item?.created_by?.user_image}
                              : require('../../../assets/images/no_image.png')
                          }
                          style={styles.userImgwrapper}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'OpenSans-Bold',
                            marginBottom: 2,
                          }}>
                          {item?.created_by?.user_name}
                        </Text>
                        <StarRating averageRate={item.rate} size={16} />
                      </View>
                    </View>
                    <Text style={styles.textReview}>{item?.content}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.cartRow}>
        <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
          <Text style={styles.cartTitle}>Mua Ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addCartHandle(item)}
          style={styles.addCart}>
          <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
