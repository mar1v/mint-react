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
    <div className="bg-white border border-gray-200 rounded-lg p-6 ">
      <div className="flex flex-row gap-4">
        <div>
          <div className="w-32 h-32 bg-gray-100 rounded-lg ">
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover " />
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex flex-justify-between h-full">
            <div className="flex-grow mb-4 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description || 'No description available'}</p>
              <div className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center bg-gray-50 rounded-lg p-2">
                <Button
                  size="small"
                  shape="circle"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-6 h-6 flex items-center justify-center border-gray-300 disabled:opacity-50"
                >
                  -
                </Button>
                <span className="w-12 text-center text-sm font-medium ">{item.quantity}</span>
                <Button
                  size="small"
                  shape="circle"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-black text-white border-black hover:bg-gray-800"
                >
                  +
                </Button>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
              <Button
                size="small"
                onClick={() => handleRemoveFromCart(item)}
                className="text-red-500 border-red-500 hover:text-red-700 hover:bg-red-50 px-2"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
