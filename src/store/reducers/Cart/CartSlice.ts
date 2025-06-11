import { CartState, IProduct } from '#types/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  itemsInCart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<IProduct>) {
      const newItem = action.payload;
      const item = state.itemsInCart.find((i) => i.id === newItem.id);

      if (item) {
        item.quantity++;
      } else {
        state.itemsInCart.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action: PayloadAction<IProduct>) {
      const id = action.payload.id;
      const item = state.itemsInCart.find((i) => i.id === id);
      if (!item) return;

      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.price * item.quantity;
      state.itemsInCart = state.itemsInCart.filter((i) => i.id !== id);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.itemsInCart.find((i) => i.id === id);
      if (!item) return;

      if (quantity <= 0) {
        state.itemsInCart = state.itemsInCart.filter((i) => i.id !== id);
      } else {
        item.quantity = quantity;
      }

      state.totalQuantity = state.itemsInCart.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.itemsInCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    clearCart(state) {
      state.itemsInCart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
