import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetLaptopsQuery, useGetSmartphonesQuery } from "../api/productsApi";
import { IProduct } from "@/types/models";
import { useMemo } from "react";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch();
export const useProductsQueryByCategory = (category: 'laptops' | 'smartphones') => {
    const laptops = useGetLaptopsQuery(undefined, { skip: category !== 'laptops' });
    const smartphones = useGetSmartphonesQuery(undefined, { skip: category !== 'smartphones' });

    return category === 'laptops' ? laptops : smartphones;
};
export const useSortedProducts = <ProductType extends IProduct>(products: ProductType[]) => {
    const { sortType } = useTypedSelector(state => state.filter);

    return useMemo(() => {
        const result = [...products];
        switch (sortType) {
            case "price-asc":
                return result.sort((a, b) => a.price - b.price);
            case "price-desc":
                return result.sort((a, b) => b.price - a.price);
            case "alphabet":
                return result.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return result;
        }
    }, [products, sortType]);
};

