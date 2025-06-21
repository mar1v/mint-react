import { IProduct } from '#types/models';
import { Row } from 'antd';
import { FC } from 'react';
import { ProductCard } from './ProductCard';

interface ProductsListProps {
  products: IProduct[];
  wishItems: IProduct[];
  cartAddCartHandler: (product: IProduct) => void;
  toggleFavorite: (product: IProduct) => void;
}

export const ProductsList: FC<ProductsListProps> = ({ products, wishItems, cartAddCartHandler, toggleFavorite }) => {
  const isProductInWishlist = (productId: number) => {
    return wishItems.some((item: IProduct) => item.id === productId);
  };

  if (products.length === 0) {
    return (
      <Row gutter={[16, 16]}>
        <h1 className="flex justify-center w-full">No results</h1>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isProductInWishlist={isProductInWishlist}
          cartAddCartHandler={cartAddCartHandler}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </Row>
  );
};
