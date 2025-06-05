import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@/types/models";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints: (builder) => ({
        getLaptops: builder.query<IProduct[], void>({
            query: () => "products/category/laptops",
            transformResponse: (response: { products: IProduct[] }) => response.products,
        }),
        getSmartphones: builder.query<IProduct[], void>({
            query: () => "products/category/smartphones",
            transformResponse: (response: { products: IProduct[] }) => response.products,
        }),
    }),
});

export const { useGetLaptopsQuery, useGetSmartphonesQuery } = productsApi;




