import { Button } from 'antd';
import { FC } from 'react';

interface CheckoutSummaryProps {
  totalPrice: string;
  handleClearCart: () => void;
}

export const CheckoutSummary: FC<CheckoutSummaryProps> = ({ totalPrice, handleClearCart }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-end">
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">Subtotal: {totalPrice}$</p>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t">
        <Button danger onClick={handleClearCart} className="text-red-600 border-red-300 hover:bg-red-50">
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
