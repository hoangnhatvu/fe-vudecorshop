import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './orderHistoryList.style';
import OrderHistoryItem from './OrderHistoryItem';
import {getOrderByUser} from '../../helpers/handleOrderApis';
import {useToastMessage} from '../../hook/showToast';
import {COLORS, SIZES} from '../../../constants';
import { useFocusEffect } from '@react-navigation/native';

const OrderHistoryList = ({route}) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {showToast} = useToastMessage();
  const {status} = route.params;

  const loadData = async () => {
    setIsLoading(true);
    try {
      const responseResults = await getOrderByUser(status);
      setdata(responseResults.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={80} color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView>
          {data.length > 0 && (
            <View style={{ paddingVertical: SIZES.small }}>
              {data.map((item, index) => (
                <OrderHistoryItem item={item} key={index} loadData={loadData} />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderHistoryList;
