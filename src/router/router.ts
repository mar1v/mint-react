import React from 'react'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'



interface IRoute {
    path: string,
    component: React.ComponentType<any>
}

export enum routesNames {
    SHOP = '/shop',
    CART = '/cart',
    WISHLIST = '/wishlist'
}



export const mainPage: IRoute[] = [
    { path: routesNames.SHOP, component: Shop },
    { path: routesNames.CART, component: Cart },
    { path: routesNames.WISHLIST, component: Wishlist },
]