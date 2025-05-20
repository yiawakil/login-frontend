import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../api';

export const authApi = createApi({
 reducerPath: 'authApi',
 baseQuery: fetchBaseQuery({
   baseUrl: BACKEND_API, // Replace with your NestJS API base
 }),
 endpoints: (builder) => ({
   login: builder.mutation<{ access_token: string }, { email: string; password: string }>({
     query: (credentials) => ({
       url: '/auth/login', // Your API endpoint
       method: 'POST',
       body: credentials,
     }),
   }),
 }),
});
export const { useLoginMutation } = authApi;



