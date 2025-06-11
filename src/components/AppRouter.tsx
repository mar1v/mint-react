import AppLayout from '#components/AppLayout';
import { routesNames } from '#constants';
import { Cart, Shop, Wishlist } from '#pages';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={routesNames.SHOP} element={<Shop />} />
        <Route path={routesNames.WISHLIST} element={<Wishlist />} />
        <Route path={routesNames.CART} element={<Cart />} />
        <Route path="*" element={<Navigate to={routesNames.SHOP} replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
