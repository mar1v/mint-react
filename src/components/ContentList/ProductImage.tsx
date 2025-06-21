import { IProduct } from '#types/models';
import { FC } from 'react';

interface ProductImageProps {
  product: IProduct;
}

export const ProductImage: FC<ProductImageProps> = ({ product }) => {
  if (!product.images || product.images.length === 0) {
    return (
      <div className="h-48 w-full p-1 flex items-center justify-center bg-gray-100 rounded-t-lg">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <img
      alt={product.title}
      src={product.images[0]}
      className="h-48 w-full object-contain rounded-t-lg p-1"
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/200x200?text=No+Image';
      }}
    />
  );
};
