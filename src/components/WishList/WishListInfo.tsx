import { IProduct } from '#types/models';
import { FC } from 'react';

interface WishListInfoProps {
  product: IProduct;
}

export const WishListInfo: FC<WishListInfoProps> = ({ product }) => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <h3 className="m-0 mb-2 text-base font-medium min-h-12 flex items-center justify-center">{product.title}</h3>
      <p className="m-0 mb-4 text-sm font-semibold">${product.price} USD</p>
    </div>
  );
};
