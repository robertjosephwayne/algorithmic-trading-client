import { formatRFC3339 } from 'date-fns';
import { useState } from 'react';
import { useGetPortfolioHistoryQuery } from '../api/apiSlice';
import Page from '../components/Page';
import PortfolioChart from '../components/PortfolioChart';

export default function Portfolio() {
    const [selectedTimeframe] = useState('1D');
    const [startDate] = useState(formatRFC3339(new Date(2023, 1, 1)));

    const { data, isLoading } = useGetPortfolioHistoryQuery({
        timeframe: selectedTimeframe,
        start: startDate,
    });

    return (
        <Page>
            <PortfolioChart data={data} isLoading={isLoading} />
        </Page>
    );
}
