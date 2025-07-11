import { combineReducers } from '@reduxjs/toolkit';
import ingredients from './slices/ingredientsSlice';
import order from './slices/orderSlice';
import feed from './slices/feedSlice';
import auth from './slices/authSlice';
import burgerConstructor from './slices/burgerConstructorSlice';
import orders from './slices/ordersDataSlice';
import orderDetails from './slices/orderDetailsSlice';

export const rootReducer = combineReducers({
  ingredients,
  order,
  feed,
  auth,
  burgerConstructor,
  orders,
  orderDetails
});
