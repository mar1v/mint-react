import { novaposhtaApi } from "#api/novaPoshtaApi";
import { productsApi } from "../../api/productsApi";
import { authReducer } from "./auth/auth";
import { cartReducer } from "./Cart/CartSlice";
import { categoryReducer } from "./Category/CategorySlice";
import { shippingReducer } from "./Shipping/ShippingSlice";
import { filterReducer } from "./Sorting/FilterSlice";
import { wishReducer } from "./Wish/WishSlice";

export const reducers = {
    auth: authReducer,
    cart: cartReducer,
    wish: wishReducer,
    filter: filterReducer,
    category: categoryReducer,
    shipping : shippingReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [novaposhtaApi.reducerPath]: novaposhtaApi.reducer
}