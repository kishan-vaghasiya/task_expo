import {configureStore} from "@reduxjs/toolkit"
import {persistStore, persistReducer} from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import authReducer from "./slices/authSlice"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // only auth will be persisted
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store)
