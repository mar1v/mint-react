import { City, Warehouse } from '#types/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_NOVA_POSHTA_URL;

export const novaposhtaApi = createApi({
  reducerPath: 'novaposhtaApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCities: builder.query<City[], string>({
      query: (search) => ({
        url: '', 
        method: 'POST',
        body: {
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {
            FindByString: search,
          },
        },
      }),
      transformResponse: (res: { data: City[] }) => res.data,
    }),

    getWarehouses: builder.query<Warehouse[], string>({
      query: (cityRef) => ({
        url: '', 
        method: 'POST',
        body: {
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: cityRef,
          },
        },
      }),
      transformResponse: (res: { data: Warehouse[] }) => res.data,
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useGetWarehousesQuery,
  useLazyGetWarehousesQuery,
} = novaposhtaApi;
