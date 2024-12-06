import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const BASE_ENDPOINT = '';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/gateway/v1`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  },
  credentials: 'include'
});



