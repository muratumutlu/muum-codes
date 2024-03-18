/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import dataReducer from './data/dataSlice';
import filterReducer from './filter/filterSlice';

const rootReducer = combineReducers({
  filter: filterReducer,
  data: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
