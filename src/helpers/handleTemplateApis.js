import axios from 'axios';
import {API_URL} from '@env';

const getAllTemplates = async data => {
  const page = 1;
  const limit = 20;
  const endpoint = `${API_URL}templates/getAll?page=1&limit=20`;
  const body = data;
  try {
    const response = await axios.post(endpoint, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getAllTemplates};
