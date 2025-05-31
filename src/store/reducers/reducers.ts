import { authReducer } from "./auth/auth";
import { cartReducer } from "./CartSlice/CartSlice";
import { searchReducer } from "./Search/SearchSlice";


export const reducers = {
    auth: authReducer,
    cart: cartReducer,
    search: searchReducer
}