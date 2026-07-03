import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { currentOrderReducer } from './slices/currentOrderSlice';
import { feedSliceReducer } from './slices/feedSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';
import { authSliceReducer } from './slices/authSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  currentOrder: currentOrderReducer,
  feed: feedSliceReducer,
  userOrders: userOrdersReducer,
  auth: authSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
