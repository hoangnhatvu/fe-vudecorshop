import axios from 'axios';
import {GHN_URL, GHN_TOKEN} from '@env';

const token = GHN_TOKEN;

const getProvinces = async () => {
  try {
    const endpoint = `${GHN_URL}shiip/public-api/master-data/province`;
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getDistrictsByProvince = async provinceId => {
  try {
    if (!provinceId) {
      throw new Error('Vui lòng chọn tỉnh thành trước!');
    }
    const endpoint = `${GHN_URL}shiip/public-api/master-data/district`;
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
      params: {
        province_id: provinceId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWardsByDistrict = async districtId => {
  try {
    if (!districtId) {
      throw new Error('Vui lòng chọn quận huyện trước !');
    }
    const endpoint = `${GHN_URL}shiip/public-api/master-data/ward`;
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
      params: {
        district_id: districtId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getProvinces, getDistrictsByProvince, getWardsByDistrict};
