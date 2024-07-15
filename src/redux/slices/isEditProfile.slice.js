import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const isEditProfileSlice = createSlice({
  name: 'isEditProfile',
  initialState,
  reducers: {
    setIsEditProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setIsEditProfile} = isEditProfileSlice.actions;

export default isEditProfileSlice.reducer;
