import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from '../pages/Shop';
import Login from '../pages/Login';
import { privateRoutes, publicRoutes } from '../router/router';

const AppRouter = () => {
    const auth = true;
    return (
        <Routes>
            {
                auth ? (
                    <>
                        {privateRoutes.map(route =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        )}
                        <Route path="*" element={<Shop />} />
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
                        <Route path="*" element={<Login />} />
                        )
                    </>
            }
        </Routes>
    )
}

export default AppRouter;
