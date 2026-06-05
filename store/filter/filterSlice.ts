/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import {
  FilterState,
  FreshnessWindow,
  OrderBy,
  SignalFilterKey,
  SortBy,
} from '@/types/Filter.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: FilterState = {
  languages: ['javascript'],
  searchTerm: '',
  sortBy: 'stars',
  orderBy: 'desc',
  minStars: 0,
  freshness: 'any',
  signalFilters: [],
  currentPage: 1,
  totalPages: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.languages = action.payload;
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
    setMinStars: (state, action: PayloadAction<number>) => {
      state.minStars = action.payload;
    },
    setFreshness: (state, action: PayloadAction<FreshnessWindow>) => {
      state.freshness = action.payload;
    },
    setSignalFilters: (state, action: PayloadAction<SignalFilterKey[]>) => {
      state.signalFilters = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    resetAll: (state) => {
      state.languages = ['javascript'];
      state.searchTerm = '';
      state.sortBy = 'lastUpdate';
      state.orderBy = 'desc';
      state.minStars = 0;
      state.freshness = 'any';
      state.signalFilters = [];
      state.currentPage = 1;
    },
  },
});

export const {
  setLanguages,
  setSearchTerm,
  setSortBy,
  setOrderBy,
  setMinStars,
  setFreshness,
  setSignalFilters,
  setCurrentPage,
  setTotalPages,
  resetAll,
} = filterSlice.actions;

export const selectFilter = (state: { filter: FilterState }) => state.filter;

export default filterSlice.reducer;
