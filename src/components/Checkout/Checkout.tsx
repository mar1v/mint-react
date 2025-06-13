import { useAppDispatch, useSortedProducts, useTypedSelector } from '#hooks';
import { clearCart, removeItemFromCart, updateQuantity } from '#store/reducers';
import { ICartItem, IProduct } from '#types/models';
import { filterProducts } from '#utils/filteredProducts';
import { Layout, Row } from 'antd';
import { FC, useMemo } from 'react';
import { CheckoutProductList } from './CheckoutProductList';

export const Checkout: FC = () => {
  const dispatch = useAppDispatch();
  const itemsInCart = useTypedSelector((state) => state.cart.itemsInCart);
  const totalQuantity = useTypedSelector((state) => state.cart.totalQuantity);
  const totalPrice = useTypedSelector((state) => state.cart.totalAmount.toFixed(2));
  const isCartEmpty = itemsInCart.length === 0 || totalQuantity === 0;
  const sortedProducts = useSortedProducts(itemsInCart);
  const filteredProducts = useMemo(() => filterProducts<ICartItem>(sortedProducts, '', { min: 0, max: Infinity }), [sortedProducts]);

  const handleRemoveFromCart = (product: IProduct) => {
    dispatch(removeItemFromCart(product));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <Layout.Content>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <CheckoutProductList
          isCartEmpty={isCartEmpty}
          itemsInCart={filteredProducts}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateQuantity={handleUpdateQuantity}
          handleClearCart={handleClearCart}
          totalPrice={totalPrice}
        />
      </Row>
    </Layout.Content>
  );
};
