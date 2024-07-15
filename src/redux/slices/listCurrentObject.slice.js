import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const listCurrentObjectSlice = createSlice({
  name: 'listCurrentObject',
  initialState,
  reducers: {
    setListCurrentObject: state => {
      state.value = [];
    },
    addCurrentObject: (state, action) => {
      existingItemIndex = state.value.findIndex(
        item => item.url === action.payload,
      );
      if (existingItemIndex !== -1) {
        state.value[existingItemIndex].isShow = true;
      } else {
        state.value.push({url: action.payload, isShow: true});
      }
    },
    hideCurrentObject: (state, action) => {
      existingItemIndex = state.value.findIndex(
        item => item.url === action.payload,
      );
      if (existingItemIndex !== -1)
        state.value[existingItemIndex].isShow = false;
    },
  },
});

export const {
  setListCurrentObject,
  addCurrentObject,
  hideCurrentObject,
} = listCurrentObjectSlice.actions;

export default listCurrentObjectSlice.reducer;
