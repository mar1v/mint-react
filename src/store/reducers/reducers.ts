import { productsApi } from "../../api/productsApi";
import { authReducer } from "./auth/auth";
import { cartReducer } from "./CartSlice/CartSlice";
import { categoryReducer } from "./Category/CategorySlice";
import { searchReducer } from "./Search/SearchSlice";
import { sortingReducer } from "./Sorting/SortingSlice";
import { wishReducer } from "./Wish/WishSlice";



export const reducers = {
    auth: authReducer,
    cart: cartReducer,
    search: searchReducer,
    wish: wishReducer,
    sorting: sortingReducer,
    category: categoryReducer,
    [productsApi.reducerPath]: productsApi.reducer
}