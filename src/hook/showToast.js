import {useToast} from 'react-native-toast-notifications';
import React, {useState, useEffect} from 'react';

export const useToastMessage = () => {
  const toast = useToast();
  const showToast = (content, type) => {
    toast.show(content, {
      type: type,
      placement: 'top',
      duration: 4000,
      animationType: 'zoom-in',
      style: {borderRadius: 20},
    });
  };

  return {showToast};
};
