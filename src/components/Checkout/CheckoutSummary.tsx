import { Button } from 'antd';
import { FC } from 'react';

interface CheckoutSummaryProps {
  totalPrice: string;
}

export const CheckoutSummary: FC<CheckoutSummaryProps> = ({ totalPrice }) => {
  const subtotal = parseFloat(totalPrice);
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center gap-2">Shipping</span>
            <span>{shippingCost === 0 ? <span className="text-green-600 font-medium">FREE</span> : `${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {subtotal < 100 && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-blue-800"> Add ${(100 - subtotal).toFixed(2)} more to qualify for FREE shipping!</p>
            </div>
          )}
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div>
        <Button type="primary" size="large" className="w-full bg-black border-black h-12 text-lg font-semibold">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};
