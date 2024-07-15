import axios from 'axios';
import {API_URL, API_URL_SEARCH_IMAGE} from '@env';

const searchProducts = async data => {
  const page = 1;
  const limit = 20;
  const endpoint = `${API_URL}products/search?page=1&limit=20`;
  const body = data;
  try {
    const response = await axios.post(endpoint, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const searchImage = async data => {
  const endpoint = `http://192.168.1.5:8000/predict/`;
  const body = data;
  try {
    const response = await axios.post(endpoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export {searchProducts, searchImage};
