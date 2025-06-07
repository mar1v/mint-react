import { Navigate, Route, Routes } from 'react-router-dom'
import { mainPage } from '../router'
import { routesNames } from '../constants'

const AppRouter = () => {
    return (
        <Routes>
            {mainPage.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)}
            <Route path='*' element={<Navigate to={routesNames.SHOP} replace />} />
        </Routes>
    )
}

export default AppRouter
