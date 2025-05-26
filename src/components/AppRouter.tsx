import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { mainPage, routesNames } from '../router/router'

const AppRouter = () => {
    return (
        <Routes>
            {mainPage.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)}
            <Route path='*' element={<Navigate to={routesNames.SHOP} replace />} />
        </Routes>
    )
}

export default AppRouter
