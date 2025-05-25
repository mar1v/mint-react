import React from 'react'
import Shop from '../pages/Shop'


interface IRoute {
    path: string,
    component: React.ComponentType<any>
}

export enum routesNames {
    SHOP = '/shop'
}



export const mainPage: IRoute[] = [
    { path: routesNames.SHOP, component: Shop },
]