import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

import { lettersApi } from './services/api/letterApi';
import lettersReducer from './services/slices/letterSlice'

import authReducer from './services/slices/authSlice'
import { authApi } from './services/api/authApi';


let store; // singleton store 

const setupStore = () => {

  const theStore = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,

      [lettersApi.reducerPath]: lettersApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      authApi.middleware,
      lettersApi.middleware,
    ),
  });

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(theStore.dispatch)

  return theStore

};


// acts as a singleton factory method
const getStore = () => {
  if (store === undefined) {
    store = setupStore();
  }
  return store;
};

export default getStore;
