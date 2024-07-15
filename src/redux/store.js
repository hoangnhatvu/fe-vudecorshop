import {configureStore} from '@reduxjs/toolkit';
import isCheckAllReducer from './slices/isCheckAll.slice';
import isEditProfileReducer from './slices/isEditProfile.slice';
import listOrderItemReducer from './slices/listOrderItem.slice';
import listCurrentObjectReducer from './slices/listCurrentObject.slice';
import userInfoReducer from './slices/userInfo.slice';
import optionProductReducer from './slices/optionProduct.slice';
import isLoginReducer from './slices/isLogin.slice';
import selectedAddressReducer from './slices/selectedAddress.slice';
import selectedObjectReducer from './slices/selectedObject.slice';
import listReviewReducer from './slices/listReview.slice';

const store = configureStore({
  reducer: {
    isCheckAll: isCheckAllReducer,
    isEditProfile: isEditProfileReducer,
    listOrderItem: listOrderItemReducer,
    listCurrentObject: listCurrentObjectReducer,
    userInfo: userInfoReducer,
    optionProduct: optionProductReducer,
    isLogin: isLoginReducer,
    selectedAddress: selectedAddressReducer,
    selectedObject: selectedObjectReducer,
    listReview: listReviewReducer,
  },
});

export default store;
