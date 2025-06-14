import { ICategoryState } from '#types/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategoryState = {
  category: 'laptops',
  items: [],
};

export const categorySlice = () =>
  createSlice({
    name: 'category',
    initialState,
    reducers: {
      changeCategory(state, action: PayloadAction<'laptops' | 'smartphones'>) {
        state.category = action.payload;
      },
    },
  });

export const { changeCategory } = categorySlice().actions;
export const categoryReducer = categorySlice().reducer;
