import axios from 'axios';
import {OPENAI_KEY, OPENAI_URL, OPENAI_MODEL} from '@env';

const chat = async messagesData => {
  try {
    const OPENAI_API_KEY = `${OPENAI_KEY}`;

    const data = {
      model: `${OPENAI_MODEL}`,
      messages: messagesData,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    };
    console.log("response neeeeeeeeeeeeeee", config)

    const response = await axios.post(`${OPENAI_URL}`, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {chat};
