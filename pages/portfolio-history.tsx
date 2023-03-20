import { formatRFC3339 } from 'date-fns';
import { useState } from 'react';
import {
    getPortfolioHistory,
    getRunningQueriesThunk,
    useGetPortfolioHistoryQuery,
} from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioChartControlPanel from '../components/PortfolioChartControlPanel';
import { wrapper } from '../redux/store';

export default function PortfolioHistory() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
    const [startDate, setStartDate] = useState(formatRFC3339(new Date(2023, 2, 1)));

    const { data: portfolioData, isLoading: portfolioDataIsLoading } = useGetPortfolioHistoryQuery({
        timeframe: selectedTimeframe,
        start: startDate,
    });

    const handleStartDateChange = (startDate: string | null) => {
        if (startDate) {
            setStartDate(formatRFC3339(new Date(startDate)));
        }
    };

    const handleTimeframeChange = (timeframe: string) => {
        setSelectedTimeframe(timeframe);
    };

    return (
        <Page>
            {portfolioDataIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='flex flex-col items-center justify-center w-full h-full'>
                    <PortfolioChart
                        data={portfolioData}
                        isLoading={portfolioDataIsLoading}
                    ></PortfolioChart>
                    <PortfolioChartControlPanel
                        selectedTimeframe={selectedTimeframe}
                        startDate={startDate}
                        onStartDateChange={handleStartDateChange}
                        onTimeframeChange={handleTimeframeChange}
                    ></PortfolioChartControlPanel>
                </div>
            )}
        </Page>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getPortfolioHistory.initiate({}));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {},
    };
});
