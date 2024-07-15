import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const selectedObjectSlice = createSlice({
  name: 'selectedObject',
  initialState,
  reducers: {
    setSelectedObject: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSelectedObject} = selectedObjectSlice.actions;

export default selectedObjectSlice.reducer;
