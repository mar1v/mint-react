import React from 'react'
import Login from '../pages/Login'
import Shop from '../pages/Shop'


interface IRoute {
    path: string,
    component: React.ComponentType<any>
}

export enum routesNames {
    LOGIN = '/login',
    SHOP = '/shop'
}


export const publicRoutes: IRoute[] = [
    { path: routesNames.LOGIN, component: Login },
]

export const privateRoutes: IRoute[] = [
    { path: routesNames.SHOP, component: Shop },
]