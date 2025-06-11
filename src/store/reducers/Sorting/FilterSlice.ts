import { FilterState } from '#types/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterState = {
  priceRange: { min: 0, max: 5000 },
  sortType: '',
  searchValue: '',
  appliedSearchValue: '',
};

export const filterSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = action.payload;
    },
    setSortType(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setAppliedSearchValue(state, action: PayloadAction<string>) {
     state.appliedSearchValue = action.payload;
   }
  },
});

export const { setPriceRange, setSortType, setSearchValue, setAppliedSearchValue } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
