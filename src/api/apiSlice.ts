import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../constants';
const SERVER_URL = config.SERVER_URL || '';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api` }),
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => '/crypto/account',
        }),
        getActivities: builder.query({
            query: () => '/crypto/activities',
        }),
        getBars: builder.query({
            query: ({ start, symbol, timeframe, interval }) =>
                `/crypto/bars/${symbol}?timeframe=${timeframe}&start=${encodeURIComponent(
                    start,
                )}&interval=${interval}`,
        }),
        getLatestTrades: builder.query({
            query: () => '/crypto/trades/latest',
        }),
        getOrders: builder.query({
            query: () => '/crypto/orders',
        }),
        getPortfolioHistory: builder.query({
            query: ({ timeframe, start }) =>
                `/crypto/portfolio-history?timeframe=${timeframe}&start=${encodeURIComponent(
                    start,
                )}`,
        }),
        getPositions: builder.query({
            query: () => '/crypto/positions',
        }),
        getSnapshotAllTickers: builder.query({
            query: () => '/snapshot/markets/crypto/tickers',
        }),
    }),
});

export const {
    useGetAccountQuery,
    useGetActivitiesQuery,
    useGetBarsQuery,
    useGetLatestTradesQuery,
    useGetOrdersQuery,
    useGetPortfolioHistoryQuery,
    useGetPositionsQuery,
    useGetSnapshotAllTickersQuery,
} = apiSlice;
