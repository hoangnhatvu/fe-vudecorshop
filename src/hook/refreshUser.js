import {getUser} from '../helpers/handleUserApis';
import {saveUserData} from '../helpers/userDataManager';

const useRefreshUser = () => {
  const refreshUser = async () => {
    try {
      const responseData = await getUser();
      console.log(responseData)
      await saveUserData(responseData);
    } catch (error) {
      throw error;
    }
  };

  return {refreshUser};
};
export default useRefreshUser;
