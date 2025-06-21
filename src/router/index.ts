import { routesNames } from '#constants'
import { Cart, Shop, Wishlist } from '#pages'
import { IRoute } from '#types/ui'

export const mainPage: IRoute[] = [
    { path: routesNames.SHOP, component: Shop },
    { path: routesNames.CART, component: Cart },
    { path: routesNames.WISHLIST, component: Wishlist },
]