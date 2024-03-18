/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  data: any[];
}

const initialState: DataState = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    resetDatas: (state) => {
      state.data = [];
    },
  },
});

export const { setData, resetDatas } = dataSlice.actions;

export const selectData = (state: { data: any }) => state.data;

export default dataSlice.reducer;
