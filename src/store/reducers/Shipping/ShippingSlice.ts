import { IShippingState } from '#types/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IShippingState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  postalCode: '',
  city: null,
  warehouse: null,
};

type FieldPayload<K extends keyof IShippingState = keyof IShippingState> = {
  key: K;
  value: IShippingState[K];
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setField<K extends keyof IShippingState>(state: IShippingState, action: PayloadAction<FieldPayload<K>>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setField } = shippingSlice.actions;
export const shippingReducer = shippingSlice.reducer;
