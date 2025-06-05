import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, SortingState } from "@/types/models";

const initialState: SortingState = {
    items: [],
}


export const sortingSlice = () => createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        sortByPrice(state, action: PayloadAction<IProduct[]>) {
            state.items = [...action.payload].sort((a, b) => a.price - b.price);
        },
        sortByAlphabet(state, action: PayloadAction<IProduct[]>) {
            state.items = [...action.payload].sort((a, b) => a.title.localeCompare(b.title));
        },
        sortByPriceRange(state, action: PayloadAction<{ min: number; max: number; products: IProduct[] }>) {
            const { min, max, products } = action.payload;
            state.items = products.filter(item => item.price >= min && item.price <= max);
        },
    }
})


export const { sortByPrice, sortByAlphabet, sortByPriceRange } = sortingSlice().actions;
export const sortingReducer = sortingSlice().reducer;