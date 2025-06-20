import { useAppDispatch, useSortedProducts, useTypedSelector } from '#hooks';
import { removeItemFromCart, updateQuantity } from '#store/reducers';
import { ICartItem, IProduct } from '#types/models';
import { filterProducts } from '#utils/filteredProducts';
import { Button, Col, Layout, Row } from 'antd';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckoutProductList } from './CheckoutProductList';
import { CheckoutShippingInfo } from './CheckoutShippingInfo';

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

  if (isCartEmpty) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
          <Link to="/">
            <Button type="primary" size="large" className="bg-black border-black font-medium px-8 py-2 h-auto">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <Layout.Content>
      <Row justify="center" gutter={16}>
        <Col xs={24} md={16}>
          <div className="pt-6">
            <h2 className="text-2xl font-semibold text-gray-900">Shipping</h2>
            <CheckoutShippingInfo />
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="pt-6">
            <CheckoutProductList
              itemsInCart={filteredProducts}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateQuantity={handleUpdateQuantity}
              totalPrice={totalPrice}
            />
          </div>
        </Col>
      </Row>
    </Layout.Content>
  );
};
