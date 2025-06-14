import { routesNames } from '#constants';
import { Button } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface CartFooterProps {
  isCartEmpty: boolean;
  onCancel: () => void;
  handleClearCart: () => void;
  totalPrice: string;
}

export const CartFooter: FC<CartFooterProps> = ({ isCartEmpty, onCancel, handleClearCart, totalPrice }) => {
  if (isCartEmpty) {
    return <Button onClick={onCancel}>Close</Button>;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <span className="font-bold mr-2">Total:</span>
        <span className="font-bold">${totalPrice}</span>
      </div>
      <div>
        <Button onClick={handleClearCart} className="mr-2">
          Clear Cart
        </Button>
        <Button onClick={onCancel} className="mr-2">
          Close
        </Button>
        <Link to={routesNames.CART}>
          <Button className="bg-black text-white border-black font-medium" onClick={onCancel}>
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};
