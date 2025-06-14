import { IProduct } from '#types/models';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Card, Col } from 'antd';
import { FC } from 'react';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';

interface ProductCardProps {
  product: IProduct;
  isProductInWishlist: (productId: number) => boolean;
  toggleFavorite: (product: IProduct) => void;
  cartAddCartHandler: (product: IProduct) => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, isProductInWishlist, toggleFavorite, cartAddCartHandler }) => {
  return (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
      <Card type="inner" hoverable variant="borderless" className="h-full relative min-h-96" cover={<ProductImage product={product} />}>
        <ProductInfo product={product} />
        <Button
          type="primary"
          onClick={() => cartAddCartHandler(product)}
          className="flex absolute bottom-4 right-4 bg-black border-black font-medium"
        >
          Add to Cart
        </Button>
        <div className="absolute top-2 right-2">
          {isProductInWishlist(product.id) ? (
            <HeartFilled className="cursor-pointer text-red-500" onClick={() => toggleFavorite(product)} />
          ) : (
            <HeartOutlined className="cursor-pointer" onClick={() => toggleFavorite(product)} />
          )}
        </div>
      </Card>
    </Col>
  );
};
