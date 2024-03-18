/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import { FilterState, OrderBy, SortBy } from '@/types/Filter.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: FilterState = {
  filter: 'javascript',
  searchTerm: '',
  sortBy: 'lastUpdate',
  orderBy: 'desc',
  currentPage: 1,
  totalPages: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<OrderBy>) => {
      state.orderBy = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    resetAll: (state) => {
      state.filter = '';
      state.searchTerm = '';
      state.sortBy = 'lastUpdate';
      state.orderBy = 'desc';
      state.currentPage = 1;
    },
  },
});

export const {
  setFilter,
  setSearchTerm,
  setSortBy,
  setOrderBy,
  setCurrentPage,
  setTotalPages,
  resetAll,
} = filterSlice.actions;

export const selectFilter = (state: { filter: FilterState }) => state.filter;

export default filterSlice.reducer;
