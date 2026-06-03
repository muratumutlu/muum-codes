import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Our reducers
import dataReducer from './data/dataSlice';
import filterReducer from './filter/filterSlice';

const rootReducer = combineReducers({
  filter: filterReducer,
  data: dataReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Optionally, we can specify a list of reducers to persist,
  // if we don't want to persist all state:
  // whitelist: ['filter']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
