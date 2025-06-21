import { IProduct } from '#types/models';
import { Button, Card, Col } from 'antd';
import { FC } from 'react';
import { WishListImage } from './WishListImage';

interface WishListCardProps {
  product: IProduct;
  handleAddToCart: (product: IProduct) => void;
  handleRemoveFromWish: (product: IProduct) => void;
}

export const WishListCard: FC<WishListCardProps> = ({ product, handleAddToCart, handleRemoveFromWish }) => {
  return (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
      <Card className="relative h-96 flex flex-col" cover={<WishListImage product={product} handleRemoveFromWish={handleRemoveFromWish} />}>
        <div>
          <h3 className="m-0 mb-2 text-base font-medium min-h-12 flex items-center justify-center">{product.title}</h3>
          <p className="m-0 mb-4 text-sm font-semibold flex items-center justify-center">${product.price} USD</p>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            block
            className="bg-black border-black font-medium h-11 mt-auto"
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </Button>
        </div>
      </Card>
    </Col>
  );
};
