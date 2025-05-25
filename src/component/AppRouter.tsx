import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes, routesNames } from '../router/router';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter = () => {
    const { isAuth } = useTypedSelector(state => state.auth)
    return (
        <Routes>
            {
                isAuth ? (
                    <>
                        {privateRoutes.map(route =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        )}
                        <Route path='*' element={<Navigate to={routesNames.SHOP} replace />} />
                    </>

                )
                    :
                    <>
                        (
                        {publicRoutes.map(route =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        )}
                        <Route path='*' element={<Navigate to={routesNames.LOGIN} replace />} />
                        )
                    </>
            }
        </Routes>
    )
}

export default AppRouter;
