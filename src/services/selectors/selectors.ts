import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectCurrentOrder = (state: RootState) =>
  state.currentOrder.order;
export const selectCurrentOrderLoading = (state: RootState) =>
  state.currentOrder.loading;
export const selectCurrentOrderError = (state: RootState) =>
  state.currentOrder.error;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedCurrentTotal = (state: RootState) =>
  state.feed.totalToday;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectUserOrders = (state: RootState) => state.userOrders.orders;
export const selectUserOrdersLoading = (state: RootState) =>
  state.userOrders.loading;
export const selectUserOrdersError = (state: RootState) =>
  state.userOrders.error;

export const selectAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectUserData = (state: RootState) => state.auth.user;

export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectLoginLoading = (state: RootState) => state.auth.loginLoading;
export const selectUpdateError = (state: RootState) => state.auth.updateError;
