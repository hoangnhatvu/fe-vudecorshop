import axios from 'axios';
import requestApi from './apiConfig';
import moment from 'moment';
import {GHN_URL, GHN_TOKEN} from '@env';
import querystring from 'qs';
import CryptoJS from 'crypto-js';

const token = GHN_TOKEN;

const calculateFeeShip = async (districtId, wardCode, codAmount) => {
  try {
    const endpoint =
      `${GHN_URL}shiip/public-api/v2/shipping-order/fee`;
    const response = await axios.post(
      endpoint,
      {
        service_id: 53320,
        service_type_id: 2,
        to_district_id: districtId,
        to_ward_code: wardCode,
        weight: 2000,
        cod_failed_amount: codAmount,
      },
      {
        headers: {
          Token: token,
          ShopId: 190512,
        },
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const createOrder = async data => {
  const request = {
    endpoint: 'orders/create',
    method: 'POST',
    params: undefined,
    body: data,
    responseType: undefined,
  };
  try {
    const response = await requestApi(request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPayment = async (amount, orderId) => {
  const request = {
    endpoint: 'orders/createPayment',
    method: 'GET',
    params: {amount: amount, orderId: orderId},
    body: undefined,
    responseType: undefined,
  };
  try {
    const response = await requestApi(request);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export {calculateFeeShip, createOrder, createPayment};
