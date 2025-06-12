import { useAppDispatch, useSortedProducts, useTypedSelector } from '#hooks';
import { clearCart, removeItemFromCart, updateQuantity } from '#store/reducers';
import { ICart, ICartItem, IProduct } from '#types/models';
import { filterProducts } from '#utils/filteredProducts';
import { Modal } from 'antd';
import { FC, useMemo } from 'react';
import { CartFooter, CartItemsList } from './';

export const CartModal: FC<ICart> = ({ isModalVisible, onCancel }) => {
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
    <Modal
      title="Cart"
      open={isModalVisible}
      onCancel={onCancel}
      footer={<CartFooter isCartEmpty={isCartEmpty} onCancel={onCancel} handleClearCart={handleClearCart} totalPrice={totalPrice} />}
    >
      <CartItemsList
        isCartEmpty={isCartEmpty}
        itemsInCart={filteredProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        handleUpdateQuantity={handleUpdateQuantity}
      />
    </Modal>
  );
};

export default CartModal;
