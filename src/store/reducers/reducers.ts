import { productsApi } from "../../api/productsApi";
import { authReducer } from "./auth/auth";
import { cartReducer } from "./Cart/CartSlice";
import { categoryReducer } from "./Category/CategorySlice";
import { filterReducer } from "./Sorting/FilterSlice";
import { wishReducer } from "./Wish/WishSlice";

export const reducers = {
    auth: authReducer,
    cart: cartReducer,
    wish: wishReducer,
    filter: filterReducer,
    category: categoryReducer,
    [productsApi.reducerPath]: productsApi.reducer
}