import { IUser } from '#types/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${import.meta.env.VITE_API_DUMMY_URL}`;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => 'users',
      transformResponse: (res: { users: IUser[] }) => res.users,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
