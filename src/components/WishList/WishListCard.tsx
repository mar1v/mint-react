import { IProduct } from '#types/models';
import { Button, Card, Col } from 'antd';
import { FC } from 'react';
import { WishListImage, WishListInfo } from './';

interface WishListCardProps {
  product: IProduct;
  handleAddToCart: (product: IProduct) => void;
  handleRemoveFromWish: (product: IProduct) => void;
}

export const WishListCard: FC<WishListCardProps> = ({ product, handleAddToCart, handleRemoveFromWish }) => {
  return (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
      <Card className="relative h-96 flex flex-col" cover={<WishListImage product={product} handleRemoveFromWish={handleRemoveFromWish} />}>
        <WishListInfo product={product} />
        <div className="text-center flex flex-col flex-1">
          <Button
            type="primary"
            size="large"
            block
            className="bg-black border-black font-medium h-11 mt-auto hover:bg-gray-800 hover:border-gray-800"
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </Button>
        </div>
      </Card>
    </Col>
  );
};
