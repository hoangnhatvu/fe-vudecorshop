import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './search.style';
import {Filter, ProductList} from '../../components';
import Modal from 'react-native-modal';
import {useToastMessage} from '../../hook/showToast';
import {searchProducts, searchImage} from '../../helpers/handleProductApis';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Search = ({navigation}) => {
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const {showToast} = useToastMessage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await searchProducts({});
      setProductList(responseResults.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraLaunch = () => {
    setIsModalVisible(false);

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        setSelectedImage(response.assets?.[0]?.uri);
        const formData = new FormData();
        formData.append('image', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });

        setIsLoading(true);
        try {
          const responseData = await searchImage(formData);
          const responseResult = await searchProducts({
            searchText: responseData?.data?.result,
          });
          setProductList(responseResult.data);
        } catch (error) {
          console.log('error', error);
          showToast('Có lỗi xảy ra !', 'danger');
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleGalleryLaunch = () => {
    setIsModalVisible(false);

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.error) {
        console.log('Gallery Error: ', response.error);
      } else {
        setSelectedImage(response.assets?.[0]?.uri);
        const formData = new FormData();
        formData.append('image', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });

        setIsLoading(true);
        try {
          const responseData = await searchImage(formData);
          const responseResult = await searchProducts({
            searchText: responseData?.data?.result,
          });
          setProductList(responseResult.data);
        } catch (error) {
          console.log('error', error);
          showToast('Có lỗi xảy ra !', 'danger');
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    console.log('selectedImage', selectedImage);

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadData();
    setSelectedImage(null);
  }, []);

  const handleApplyFilter = async filters => {
    toggleBottomSheet();
    setIsLoading(true);
    try {
      let data = {};
      if (searchKey) {
        data.searchText = searchKey;
      }
      if (filters.minPrice || filters.maxPrice) {
        if (
          filters.minPrice &&
          filters.maxPrice &&
          filters.minPrice >= filters.maxPrice
        ) {
          throw new Error(
            'Giá thấp nhất không được lớn hơn hoặc bằng giá cao nhất !',
          );
        }
        if (filters.minPrice) {
          data.minPrice = filters.minPrice;
        }
        if (filters.maxPrice) {
          data.maxPrice = filters.maxPrice;
        }
      }
      if (filters.sortByPriceAscending !== null) {
        data.sortByPriceAscending = `${filters.sortByPriceAscending}`;
      }
      if (filters.selectedCategories.length > 0) {
        data.selectedCategories = filters.selectedCategories;
      }
      console.log(data);
      const responseResult = await searchProducts(data);
      console.log(responseResult.data);
      setProductList(responseResult.data);
    } catch (error) {
      if (error?.message) {
        showToast(error?.message, 'danger');
      } else {
        showToast('Có lỗi xảy ra !', 'danger');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      console.log('searchKey', searchKey);
      const responseResult = await searchProducts({searchText: searchKey});
      setProductList(responseResult.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.searchContainer}>
          {selectedImage ? (
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => console.log(selectedImage)}>
                <Image style={styles.image} source={{uri: selectedImage}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setSelectedImage(null)}>
                <Ionicons name="close-circle" size={SIZES.large} color="gray" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Ionicons
                name="camera-outline"
                size={SIZES.xLarge}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchKey}
              onFocus={() => {
                setSelectedImage(null);
              }}
              onChangeText={setSearchKey}
              placeholder="Tìm kiếm sản phẩm"></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => handleSearch()}>
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{paddingLeft: 4, marginRight: -4}}
          onPress={toggleBottomSheet}>
          <AntDesign name="filter" size={36} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ProductList data={productList} isLoading={isLoading} height={632} />
      <Modal
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleBottomSheet}
        onSwipeComplete={toggleBottomSheet}
        swipeDirection={['down']}
        style={styles.bottomSheet}>
        <Filter onApplyFilter={handleApplyFilter} />
      </Modal>
      <FlatList
        data={filteredProducts}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleCameraLaunch}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xxLarge}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGalleryLaunch}>
            <Ionicons
              name="image-outline"
              size={SIZES.xxLarge}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;
