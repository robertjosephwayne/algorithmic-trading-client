import { Card, CardContent, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
    getAccount,
    getPositions,
    getRunningQueriesThunk,
    useGetAccountQuery,
    useGetPositionsQuery,
} from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import Sidenav from '../components/Sidenav';
import { currencyFormatter, percentageFormatter } from '../utils';
import pageRoutes from '../routes';
import { wrapper } from '../redux/store';

export default function PortfolioMetrics() {
    const { data: accountData, isLoading: accountDataIsLoading } = useGetAccountQuery(
        {},
        { pollingInterval: 1000 },
    );
    const { data: positionsData, isLoading: positionsDataIsLoading } = useGetPositionsQuery(
        {},
        { pollingInterval: 1000 },
    );

    const shortValue = useMemo(() => {
        let total = 0;
        if (!positionsData) return total;

        for (const position of positionsData) {
            if (position.side === 'short') {
                total += -parseFloat(position.market_value);
            }
        }

        return total;
    }, [positionsData]);

    const longValue = useMemo(() => {
        let total = 0;
        if (!positionsData) return total;

        for (const position of positionsData) {
            if (position.side === 'long') {
                total += parseFloat(position.market_value);
            }
        }

        return total;
    }, [positionsData]);

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            {!accountDataIsLoading && !positionsDataIsLoading && (
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='body1'>
                            Short Value: {currencyFormatter(shortValue)} (
                            {percentageFormatter(shortValue / (longValue + shortValue), 4)})
                        </Typography>
                        <Typography variant='body1'>
                            Long Value: {currencyFormatter(longValue)} (
                            {percentageFormatter(longValue / (longValue + shortValue), 4)})
                        </Typography>
                        <Typography variant='body1'>
                            Total Market Value: {currencyFormatter(longValue + shortValue)}
                        </Typography>
                        <Typography variant='body1'>
                            Total Equity Value: {currencyFormatter(accountData.equity)}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Page>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getAccount.initiate({}));
    store.dispatch(getPositions.initiate({}));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {},
    };
});
