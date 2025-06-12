import { IProduct, IWishListState } from '#types/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IWishListState = {
  itemsInWishList: [],
};

export const wishSlice = () =>
  createSlice({
    name: 'wish',
    initialState,
    reducers: {
      addItemForWish(state, action: PayloadAction<IProduct>) {
        const newItem = action.payload;
        const item = state.itemsInWishList.find((item) => item.id === newItem.id);
        if (!item) {
          state.itemsInWishList.push(newItem);
        }
      },
      removeItemFromWish(state, action: PayloadAction<IProduct>) {
        const id = action.payload.id;
        state.itemsInWishList = state.itemsInWishList.filter((item) => item.id !== id);
      },
      toggleItemInWish(state, action: PayloadAction<IProduct>) {
        const id = action.payload.id;
        const item = state.itemsInWishList.find((i) => i.id === id);
        if (!item) {
          state.itemsInWishList.push(action.payload);
        } else {
          state.itemsInWishList = state.itemsInWishList.filter((i) => i.id !== id);
        }
      },
    },
  });

export const { addItemForWish, removeItemFromWish, toggleItemInWish } = wishSlice().actions;
export const wishReducer = wishSlice().reducer;
