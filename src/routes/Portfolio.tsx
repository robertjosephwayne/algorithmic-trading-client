import { formatRFC3339 } from 'date-fns';
import { useState } from 'react';
import { useGetAccountQuery, useGetPortfolioHistoryQuery } from '../api/apiSlice';
import AccountSummary from '../components/AccountSummary';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PortfolioChart from '../components/PortfolioChart';

export default function Portfolio() {
    const [selectedTimeframe] = useState('1D');
    const [startDate] = useState(formatRFC3339(new Date(2023, 1, 1)));

    const { data, isLoading: portfolioHistoryQueryIsLoading } = useGetPortfolioHistoryQuery({
        timeframe: selectedTimeframe,
        start: startDate,
    });

    const { isLoading: accountQueryIsLoading } = useGetAccountQuery({});

    return (
        <Page>
            {accountQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <>
                    <PortfolioChart data={data} isLoading={portfolioHistoryQueryIsLoading} />
                    <div className='flex justify-center px-4 pb-4'>
                        <AccountSummary />
                    </div>
                </>
            )}
        </Page>
    );
}
