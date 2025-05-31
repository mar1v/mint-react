import { RootState } from "@store/index";
import { createSelector } from "@reduxjs/toolkit";
import { products } from '../../../constants';

export const selectSearch = (state: RootState) => state.search.searchValue;

export const filteredProducts = createSelector(
    [selectSearch],
    (searchValue) =>
        products.filter(product =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        )
);
