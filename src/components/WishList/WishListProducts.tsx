import { useAppDispatch, useSortedProducts, useTypedSelector } from '#hooks';
import { addItemToCart, removeItemFromWish } from '#store/reducers';
import { IProduct } from '#types/models';
import { filterProducts } from '#utils/filteredProducts';
import { Row } from 'antd';
import { FC, useMemo } from 'react';
import { WishListCard } from './';

export const WishListProducts: FC = () => {
  const dispatch = useAppDispatch();
  const appliedSearch = useTypedSelector((state) => state.filter.appliedSearchValue);
  const priceRange = useTypedSelector((state) => state.filter.priceRange);
  const wishItems = useTypedSelector((state) => state.wish.itemsInWishList);
  const sortedProducts = useSortedProducts(wishItems);
  const filteredProducts = useMemo(
    () => filterProducts<IProduct>(sortedProducts, appliedSearch, priceRange),
    [sortedProducts, appliedSearch, priceRange],
  );

  const handleRemoveFromWish = (product: IProduct) => {
    dispatch(removeItemFromWish(product));
  };

  const handleAddToCart = (product: IProduct) => {
    dispatch(addItemToCart(product));
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="italic text-gray-500 text-lg">
          {wishItems.length === 0 ? 'Your wish list is empty' : 'No products match your search criteria'}
        </p>
      </div>
    );
  }
  return (
    <Row gutter={[16, 16]}>
      {filteredProducts.map((product) => (
        <WishListCard key={product.id} product={product} handleAddToCart={handleAddToCart} handleRemoveFromWish={handleRemoveFromWish} />
      ))}
    </Row>
  );
};
