import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { reducers } from "./reducers/reducers"
import { productsApi } from "../api/productsApi"


export const rootReducer = combineReducers(
    reducers,
)


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
