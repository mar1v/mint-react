import { authReducer } from "./auth/auth";
import { cartReducer } from "./CartSlice/CartSlice";


export const reducers = {
    auth: authReducer,
    cart: cartReducer
}