import { ICartItem, IProduct } from '#types/models';
import { FC } from 'react';
import { CheckoutProduct, CheckoutSummary } from './';

interface CheckoutProductListProps {
  itemsInCart: ICartItem[];
  handleRemoveFromCart: (product: IProduct) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
  totalPrice: string;
}

export const CheckoutProductList: FC<CheckoutProductListProps> = ({ itemsInCart, handleRemoveFromCart, totalPrice, handleUpdateQuantity }) => {
  return (
    <div className="sticky top-0 ">
      <div className="mb-2 space-y-2">
        {itemsInCart.map((item) => (
          <CheckoutProduct key={item.id} item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateQuantity={handleUpdateQuantity} />
        ))}
      </div>
      <div className="bg-gray-50 rounded-lg p-6">
        <CheckoutSummary totalPrice={totalPrice} />
      </div>
    </div>
  );
};
