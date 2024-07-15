import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../constants';
import ObjectItem from './ObjectItem';

const ListObject = ({data, handlePress}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {data.length > 0 && (
          <View style={{paddingVertical: SIZES.small}}>
            {data.map((item, index) => (
              <ObjectItem
                item={item}
                key={index}
                onPress={item => handlePress(item)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default ListObject;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.offwhite,
    flex: 1,
    paddingTop: SIZES.small,
  },
});
