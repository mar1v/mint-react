import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@/types/models";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => "categories/2/products",
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id) => `products/${id}`,
        })
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery
} = productsApi;
