import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const BASE_ENDPOINT = 'http://localhost:4000';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/gateway/v1`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  },
  // this line means that every time that we want to send a req from client to server (gateway service api) we want to attach JWT token to the request
  credentials: 'include'
});

// base query interseptal: if a req is sent and the token is expired it sends a request to renew the token
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // error 401: the token has been expired
  if (result.error && result.error.status === 401) {
    // get username from local storage
    const loggedInUsername: string = '';
    await baseQuery(`/auth/refresh-token/${loggedInUsername}`, api, extraOptions);
  }
  return result;
};

export const api = createApi({
  reducerPath: 'clientApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Auth', 'Currentuser', 'Buyer', 'Seller', 'Chat', 'Checkout', 'Products', 'Search', 'Review', 'Order', 'Notification'],
  // the callback is empty because every service has their own endpoint
  endpoints: () => ({})
});
