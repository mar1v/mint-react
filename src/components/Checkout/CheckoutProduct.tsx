import { ICartItem, IProduct } from '#types/models';
import { Button } from 'antd';
import { FC } from 'react';

interface CheckoutProductProps {
  item: ICartItem;
  handleRemoveFromCart: (product: IProduct) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
}

export const CheckoutProduct: FC<CheckoutProductProps> = ({ item, handleRemoveFromCart, handleUpdateQuantity }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-4 px-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-3">
        <p className="text-sm text-gray-600 line-clamp-2">{item.description || 'No description available'}</p>
      </td>
      <td className="py-4 px-3">
        <div className="flex items-center gap-2">
          <Button
            size="small"
            shape="circle"
            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border-gray-300"
          >
            -
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button
            size="small"
            shape="circle"
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-black text-white border-black hover:bg-gray-800"
          >
            +
          </Button>
          <Button type="link" size="small" onClick={() => handleRemoveFromCart(item)} className="text-gray-600 hover:text-red-500 ml-2">
            Remove
          </Button>
        </div>
      </td>
      <td className="py-4 px-3 text-right">
        <p className="text-sm font-semibold text-gray-900">{(item.price * item.quantity).toFixed(2)}$</p>
      </td>
    </tr>
  );
};
