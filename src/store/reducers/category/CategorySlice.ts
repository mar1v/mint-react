import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryState } from "@/types/models";

const initialState: CategoryState = {
    category: 'laptops',
    items: [],
}

export const categorySlice = () => createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory(state, action: PayloadAction<'laptops' | 'smartphones'>) {
            state.category = action.payload;
        }
    },
})

export const { changeCategory } = categorySlice().actions;
export const categoryReducer = categorySlice().reducer;