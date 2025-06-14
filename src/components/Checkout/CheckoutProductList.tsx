import { ICartItem, IProduct } from '#types/models';
import { Button } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CheckoutProduct, CheckoutSummary } from './';

interface CheckoutProductListProps {
  isCartEmpty: boolean;
  itemsInCart: ICartItem[];
  handleRemoveFromCart: (product: IProduct) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
  totalPrice: string;
  handleClearCart: () => void;
}

export const CheckoutProductList: FC<CheckoutProductListProps> = ({
  isCartEmpty,
  itemsInCart,
  handleRemoveFromCart,
  handleClearCart,
  totalPrice,
  handleUpdateQuantity,
}) => {
  if (isCartEmpty) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <p className="text-gray-500 italic text-lg mb-4">Your cart is empty</p>
          <Link to="/">
            <Button type="primary" className="bg-black border-black">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping bag</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-3 text-sm font-medium text-gray-700">Product</th>
              <th className="text-left py-3 px-3 text-sm font-medium text-gray-700">Description</th>
              <th className="text-left py-3 px-3 text-sm font-medium text-gray-700">QTY</th>
              <th className="text-right py-3 px-3 text-sm font-medium text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {itemsInCart.map((item) => (
              <CheckoutProduct key={item.id} item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateQuantity={handleUpdateQuantity} />
            ))}
          </tbody>
        </table>
      </div>
      <CheckoutSummary totalPrice={totalPrice} handleClearCart={handleClearCart} />
    </div>
  );
};
