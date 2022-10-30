import { configureStore, combineReducers } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';
import loginReducer from './loginSlice';
import signupReducer from './signupSlice';
import logoutReducer from './logoutSlice';
import customersReducer from './customersSlice';
import customersListReducer from './customerListSlice';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['apiProductSlice'],
};

export const rootReducers = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  currentUser: currentUserReducer,
  logout: logoutReducer,
  customers: customersReducer,
  customersList: customersListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
setupListeners(store.dispatch);

export default store;
