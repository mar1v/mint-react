import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@/types/models";

const CATEGORY_PATH = "products/category";
const baseUrl = `${process.env.REACT_APP_BASE_API_URL}/${CATEGORY_PATH}`;

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getLaptops: builder.query<IProduct[], void>({
            query: () => "laptops",
            transformResponse: (res: { products: IProduct[] }) => res.products,
        }),
        getSmartphones: builder.query<IProduct[], void>({
            query: () => "smartphones",
            transformResponse: (res: { products: IProduct[] }) => res.products,
        }),
    }),
});

export const { useGetLaptopsQuery, useGetSmartphonesQuery } = productsApi;
