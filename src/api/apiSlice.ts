import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../constants';
const SERVER_URL = config.SERVER_URL || '';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api` }),
    endpoints: (builder) => ({
        getSnapshotAllTickers: builder.query({
            query: () => '/snapshot/markets/crypto/tickers',
        }),
        getLatestTrades: builder.query({
            query: () => '/crypto/trades/latest',
        }),
        getBars: builder.query({
            query: ({ start, symbol, timeframe, interval }) =>
                `/crypto/bars/${symbol}?timeframe=${timeframe}&start=${encodeURIComponent(
                    start,
                )}&interval=${interval}`,
        }),
        getAccount: builder.query({
            query: () => '/crypto/account',
        }),
        getPositions: builder.query({
            query: () => '/crypto/positions',
        }),
        getActivities: builder.query({
            query: () => '/crypto/activities',
        }),
        getPortfolioHistory: builder.query({
            query: ({ timeframe, start }) =>
                `/crypto/portfolio-history?timeframe=${timeframe}&start=${encodeURIComponent(
                    start,
                )}`,
        }),
    }),
});

export const {
    useGetAccountQuery,
    useGetActivitiesQuery,
    useGetBarsQuery,
    useGetLatestTradesQuery,
    useGetPortfolioHistoryQuery,
    useGetPositionsQuery,
    useGetSnapshotAllTickersQuery,
} = apiSlice;