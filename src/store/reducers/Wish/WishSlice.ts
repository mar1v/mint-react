import { IProduct, WishState } from "@/types/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: WishState = {
    items: [],
}

export const wishSlice = () => createSlice({
    name: 'wish',
    initialState,
    reducers: {
        addItemForWish(state, action: PayloadAction<IProduct>) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push(newItem);
            }
        },
        removeItemFromWish(state, action: PayloadAction<IProduct>) {
            const id = action.payload.id;
            state.items = state.items.filter(item => item.id !== id);
        },
        toggleItemInWish(state, action: PayloadAction<IProduct>) {
            const item = action.payload;
            const existingItemIndex = state.items.findIndex(wishItem => wishItem.id === item.id);
            if (existingItemIndex >= 0) {
                state.items.splice(existingItemIndex, 1);
            } else {
                state.items.push(item);
            }
        }
    },
})

export const { addItemForWish, removeItemFromWish, toggleItemInWish } = wishSlice().actions;
export const wishReducer = wishSlice().reducer;