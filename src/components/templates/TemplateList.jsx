import {ActivityIndicator, ScrollView, View} from 'react-native';
import React from 'react';
import TemplateItem from './TemplateItem';
import {COLORS, SIZES} from '../../../constants';

const TemplateList = ({data, loading}) => {
  return loading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
    </View>
  ) : (
    <ScrollView>
      {data.map((item, index) => {
        return <TemplateItem item={item} key={index} />;
      })}
    </ScrollView>
  );
};

export default TemplateList;
