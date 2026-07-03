import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type OrderModalData = {
  number: number;
};

type OrderState = {
  orderRequest: boolean;
  orderModalData: OrderModalData | null;
  currentOrder: TOrder | null;
  currentOrderLoading: boolean;
  currentOrderError: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  currentOrder: null,
  currentOrderLoading: false,
  currentOrderError: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Ошибка загрузки заказа';
      return rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = { number: action.payload.number };
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.currentOrderLoading = true;
        state.currentOrderError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrderLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.currentOrderLoading = false;
        state.currentOrderError = action.payload as string;
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
