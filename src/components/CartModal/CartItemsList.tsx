import { ICartItem, IProduct } from '#types/models';
import { FC } from 'react';
import { CartItems } from './CartItems';

interface CartItemsListProps {
  isCartEmpty: boolean;
  itemsInCart: ICartItem[];
  handleRemoveFromCart: (product: IProduct) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
}

export const CartItemsList: FC<CartItemsListProps> = ({ isCartEmpty, itemsInCart, handleRemoveFromCart, handleUpdateQuantity }) => {
  return isCartEmpty ? (
    <div className="flex justify-center items-center">
      <p className="italic">Your cart is empty</p>
    </div>
  ) : (
    itemsInCart.map((item) => (
      <CartItems key={item.id} item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateQuantity={handleUpdateQuantity} />
    ))
  );
};
