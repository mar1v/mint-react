import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortingState } from "@/types/models";

const initialState: SortingState = {
    priceRange: { min: 0, max: 5000 },
    sortType: "",
};

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
            state.priceRange = action.payload;
        },
        setSortType(state, action: PayloadAction<string>) {
            state.sortType = action.payload;
        }
    }
});

export const { setPriceRange, setSortType } = sortingSlice.actions;
export const sortingReducer = sortingSlice.reducer;
