import { SearchState } from '@/types/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchState = {
    searchValue: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});


export const { setSearchValue } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
