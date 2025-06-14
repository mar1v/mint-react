import { ICartItem } from '#types/models';
import { Button } from 'antd';
import { FC } from 'react';

interface CartItemProps {
  item: ICartItem;
  handleRemoveFromCart: (item: ICartItem) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
}

export const CartItems: FC<CartItemProps> = ({ item, handleRemoveFromCart, handleUpdateQuantity }) => {
  return (
    <div key={item.id} className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover mr-2" />
        <div>
          <p>{item.title}</p>
          <p className="font-bold">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button onClick={() => handleRemoveFromCart(item)}>Remove</Button>
        <div className="flex items-center ml-2">
          <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
          <span className="mx-2">{item.quantity}</span>
          <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
        </div>
      </div>
    </div>
  );
};
