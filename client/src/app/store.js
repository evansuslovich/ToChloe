import { configureStore } from '@reduxjs/toolkit'

import authReducer from './services/slices/authSlice'
import { authApi } from './services/api/authApi'

import lettersReducer from './services/slices/lettersSlice'
import { lettersApi } from './services/api/lettersApi'

let store; // singleton store 

const setupStore = () => {
  
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,

      // [lettersApi.reducerPath]: lettersApi.reducer,
      // letters: lettersReducer,

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      authApi.middleware,
      lettersApi.middleware,

    ),
  })

}

// acts as a singleton factory method
const getStore = () => {
  if (store === undefined) {
    store = setupStore();
  }
  return store;
};

export default getStore;
