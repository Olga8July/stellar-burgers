import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type UserOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: UserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'userOrders/fetch',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения истории';
      });
  }
});

export const userOrdersReducer = userOrdersSlice.reducer;
