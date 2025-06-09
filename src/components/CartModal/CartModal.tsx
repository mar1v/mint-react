import { CartItem, IProduct } from '#types/models';
import { ICart } from '#types/UI-interfaces';
import { Button, Modal } from 'antd';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { routesNames } from '../../constants';
import { useAppDispatch, useSortedProducts, useTypedSelector } from '../../hooks';
import { clearCart, removeItemFromCart, updateQuantity } from '../../store/reducers';
import { filterProducts } from '../../utils/filteredProducts';

const CartModal: FC<ICart> = ({ isModalVisible, onCancel }) => {
  const dispatch = useAppDispatch();
  const items = useTypedSelector((state) => state.cart);
  const isCartEmpty = items.items.length === 0 || items.totalQuantity === 0;
  const totalPrice = items.totalAmount.toFixed(2);
  const sortedProducts = useSortedProducts(items.items);
  const filteredProducts = useMemo(() => filterProducts<CartItem>(sortedProducts, '', { min: 0, max: Infinity }), [sortedProducts]);
  const handleRemoveFromCart = (products: IProduct) => {
    dispatch(removeItemFromCart(products));
  };
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const footerContent = isCartEmpty ? (
    <div>
      <Button onClick={onCancel}>Close</Button>
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Total:</span>
        <span style={{ fontWeight: 'bold' }}>${totalPrice}</span>
      </div>
      <div>
        <Button onClick={handleClearCart} style={{ marginRight: '10px' }}>
          Clear Cart
        </Button>
        <Button onClick={onCancel} style={{ marginRight: '10px' }}>
          Close
        </Button>
        <Link to={routesNames.CART}>
          <Button
            style={{
              backgroundColor: '#000',
              borderColor: '#000',
              fontWeight: '500',
              color: '#fff',
            }}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <Modal title="Cart" closable={{ 'aria-label': 'Custom Close Button' }} open={isModalVisible} onCancel={onCancel} footer={footerContent}>
      {isCartEmpty ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontStyle: 'italic' }}> Your cart is empty</p>
        </div>
      ) : (
        filteredProducts.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.images[0]} alt={item.title} style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }} />
              <div>
                <p>{item.title}</p>
                <p style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => handleRemoveFromCart(item)}>Remove</Button>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
              </div>
            </div>
          </div>
        ))
      )}
    </Modal>
  );
};

export default CartModal;
