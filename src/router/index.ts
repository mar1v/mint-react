import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import { IRoute } from '../types/UI-interfaces'
import { routesNames } from '../constants'

export const mainPage: IRoute[] = [
    { path: routesNames.SHOP, component: Shop },
    { path: routesNames.CART, component: Cart },
    { path: routesNames.WISHLIST, component: Wishlist },
]