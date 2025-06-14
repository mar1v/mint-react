import { IProduct } from '#types/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CATEGORY_PATH = 'products/category';
const baseUrl = `${import.meta.env.VITE_API_URL}/${CATEGORY_PATH}`;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getLaptops: builder.query<IProduct[], void>({
      query: () => 'laptops',
      transformResponse: (res: { products: IProduct[] }) => res.products,
    }),
    getSmartphones: builder.query<IProduct[], void>({
      query: () => 'smartphones',
      transformResponse: (res: { products: IProduct[] }) => res.products,
    }),
  }),
});

export const { useGetLaptopsQuery, useGetSmartphonesQuery } = productsApi;
