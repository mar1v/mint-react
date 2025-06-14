import { IProduct } from '#types/models';
import { FC } from 'react';

interface ProductInfoProps {
  product: IProduct;
}

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  return (
    <>
      <span className="font-bold flex absolute left-4 top-52">{product.title}</span>
      <br />
      <span className="flex absolute left-4 top-64">{product.description.substring(0, 70)}...</span>
      <p className="font-bold flex absolute bottom-4 left-4">${product.price.toFixed(2)}</p>
    </>
  );
};
