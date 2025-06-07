import { IProduct } from "@/types/models";

export const filterProducts = (products: IProduct[], search: string, priceRange: { min: number; max: number }) => {
    return products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) &&
        product.price >= priceRange.min &&
        product.price <= priceRange.max
    );
};
