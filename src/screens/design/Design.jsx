import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './design.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {TemplateList} from '../../components';
import { getAllTemplates } from '../../helpers/handleTemplateApis';
import { useToastMessage } from '../../hook/showToast';

const Design = () => {
  const navigation = useNavigation();
  const [listTemplateItem, setListTemplateItem] = useState([]);
  const {showToast} = useToastMessage();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseData = await getAllTemplates();
      setListTemplateItem(responseData.data);
    } catch (error) {
      showToast(`${error.response.data.message}`, 'danger');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TemplateList data={listTemplateItem} loading={isLoading} />
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate('ARDesignView')}>
        <Ionicons name="cube" size={52} color={COLORS.primary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Design;
