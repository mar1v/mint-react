import { IProduct } from '#types/models';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';

interface WishListImageProps {
  product: IProduct;
  handleRemoveFromWish: (product: IProduct) => void;
}

export const WishListImage: FC<WishListImageProps> = ({ product, handleRemoveFromWish }) => {
  if (!product.images || product.images.length === 0) {
    return (
      <div className="h-48 w-full p-1 flex items-center justify-center bg-gray-100 rounded-t-lg">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <div className="relative bg-[#f5f5f5]">
      <img
        alt={product.title}
        src={product.images[0]}
        className="w-full h-48 object-contain p-4"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/200x200?text=No+Image';
        }}
      />
      <Button
        type="text"
        icon={<CloseOutlined />}
        size="small"
        className="absolute top-2 right-2 border-none"
        onClick={() => handleRemoveFromWish(product)}
      />
    </div>
  );
};
