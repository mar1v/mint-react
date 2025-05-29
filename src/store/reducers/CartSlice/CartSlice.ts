import { IProduct, CartState } from "@/types/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<IProduct>) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1
                })
            } else {
                existingItem.quantity++
            }
            state.totalQuantity++
            state.totalAmount += newItem.price
        },
        removeItem(state, action: PayloadAction<IProduct>) {
            const id = action.payload.id
            const existingItem = state.items.find(item => item.id === id)
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity
                state.totalAmount -= existingItem.price * existingItem.quantity
                if (existingItem.quantity > 1) {
                    state.items = state.items.filter(item => item.id !== id);
                }
                else {
                    state.items = state.items.filter(item => item.id !== id)
                }
            }
            if (state.items.length === 0 || state.totalQuantity === 0) {
                state.items = []
                state.totalQuantity = 0
                state.totalAmount = 0
            }
        },
        updateQuantity(state, action: PayloadAction<{ id: number, quantity: number }>) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                const newQuantity = Math.max(0, quantity);
                if (newQuantity === 0) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity = newQuantity;
                }
            }
            if (state.totalQuantity === 0) {
                state.items = [];
                state.totalAmount = 0;
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        clearCart(state) {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
        }
    }
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer;

