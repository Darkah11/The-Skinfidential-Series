import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "@/redux/slices/cartSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import { combineReducers } from '@reduxjs/toolkit';
// import { version } from 'react';

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage
// }

// const reducer = combineReducers({
//     reducer: todoReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer)
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, cartReducer)



export const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;