import { IProduct, WishState } from "@/types/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: WishState = {
    itemsInWish: [],
}

export const wishSlice = () => createSlice({
    name: 'wish',
    initialState,
    reducers: {
        addItemForWish(state, action: PayloadAction<IProduct>) {
            const newItem = action.payload;
            const item = state.itemsInWish.find(item => item.id === newItem.id);
            if (!item) {
                state.itemsInWish.push(newItem);
            }
        },
        removeItemFromWish(state, action: PayloadAction<IProduct>) {
            const id = action.payload.id;
            state.itemsInWish = state.itemsInWish.filter(item => item.id !== id);
        },
        toggleItemInWish(state, action: PayloadAction<IProduct>) {
            const id = action.payload.id;
            const item = state.itemsInWish.find((i) => i.id === id);
            if (!item) {
                state.itemsInWish.push(action.payload);
            }
            else {
                state.itemsInWish = state.itemsInWish.filter((i) => i.id !== id);
            }
        }
    },
})

export const { addItemForWish, removeItemFromWish, toggleItemInWish } = wishSlice().actions;
export const wishReducer = wishSlice().reducer;