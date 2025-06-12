import { routesNames } from '#constants';
import { RootState } from '#store';
import {
  changeCategory,
  setAppliedSearchValue,
  setPriceRange,
  setSearchValue,
} from '#store/reducers';
import { IProduct } from '#types/models';
import { theme } from 'antd';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetLaptopsQuery, useGetSmartphonesQuery } from '../api/productsApi';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch();
export const useProductsQueryByCategory = (category: 'laptops' | 'smartphones') => {
  const laptops = useGetLaptopsQuery(undefined, { skip: category !== 'laptops' });
  const smartphones = useGetSmartphonesQuery(undefined, { skip: category !== 'smartphones' });

  return category === 'laptops' ? laptops : smartphones;
};
export const useSortedProducts = <ProductType extends IProduct>(products: ProductType[]) => {
  const { sortType } = useTypedSelector((state) => state.filter);

  return useMemo(() => {
    const result = [...products];
    switch (sortType) {
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'alphabet':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return result;
    }
  }, [products, sortType]);
};

export const useAppLayout = (searchParams: URLSearchParams, setSearchParams: (params: URLSearchParams) => void) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchValue = useTypedSelector((state) => state.filter.searchValue);
  const priceRange = useTypedSelector((state) => state.filter.priceRange);
  const cartItemsCount = useTypedSelector((state) => state.cart.totalQuantity);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSearch = (searchValue: string) => {
    dispatch(setAppliedSearchValue(searchValue));
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('search', searchValue);
    setSearchParams(newParams);
  };

  const onSearchChange = (value: string) => dispatch(setSearchValue(value));
  
  const onPriceRangeChange = (value: { min: number; max: number }) =>
    dispatch(setPriceRange(value));
  
  const onCategoryChange = (value: 'laptops' | 'smartphones') => {
    const url = `${routesNames.SHOP}?category=${value}`;
    navigate(url);
    dispatch(changeCategory(value));
  };

  const isNotOnProducts = location.pathname !== routesNames.SHOP;

  return {
    handleSearch,
    onSearchChange,
    onPriceRangeChange,
    onCategoryChange,
    isNotOnProducts,
    searchValue,
    priceRange,
    cartItemsCount,
    colorBgContainer,
    borderRadiusLG,
  };
};