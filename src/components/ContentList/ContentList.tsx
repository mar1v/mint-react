import { useAppDispatch, useProductsQueryByCategory, useSortedProducts, useTypedSelector } from '#hooks';
import { addItemToCart, setSortType, toggleItemInWish } from '#store/reducers';
import { IProduct } from '#types/models';
import { filterProducts } from '#utils/filteredProducts';
import { Spin } from 'antd';
import { FC, useMemo } from 'react';
import { ProductsList, SortSelect } from './';

const ContentList: FC = () => {
  const dispatch = useAppDispatch();
  const appliedSearch = useTypedSelector((state) => state.filter.appliedSearchValue);
  const category = useTypedSelector((state) => state.category.category);
  const wishItems = useTypedSelector((state) => state.wish.itemsInWishList);
  const priceRange = useTypedSelector((state) => state.filter.priceRange);
  const { data: products = [], isLoading } = useProductsQueryByCategory(category);
  const sortedProducts = useSortedProducts(products);
  const filteredProducts = useMemo(
    () => filterProducts<IProduct>(sortedProducts, appliedSearch, priceRange),
    [sortedProducts, appliedSearch, priceRange],
  );

  const toggleFavorite = (product: IProduct) => {
    dispatch(toggleItemInWish(product));
  };
  const cartAddCartHandler = (product: IProduct) => {
    dispatch(addItemToCart(product));
  };
  const handleSortChange = (value: string) => {
    dispatch(setSortType(value));
  };

  if (isLoading) return <Spin className="h-full w-full" size="large" />;
  if (!products) return <h2>Failed to load products</h2>;

  return (
    <>
      <SortSelect handleSortChange={handleSortChange} />
      <ProductsList products={filteredProducts} wishItems={wishItems} toggleFavorite={toggleFavorite} cartAddCartHandler={cartAddCartHandler} />
    </>
  );
};

export default ContentList;
