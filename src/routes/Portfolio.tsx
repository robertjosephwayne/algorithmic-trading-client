import { formatRFC3339 } from 'date-fns';
import { useState } from 'react';
import { useGetPortfolioHistoryQuery } from '../api/apiSlice';
import PortfolioChartControlPanel from '../components/PortfolioChartControlPanel';
import Page from '../components/Page';
import PortfolioChart from '../components/PortfolioChart';

export default function Portfolio() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
    const [startDate, setStartDate] = useState(formatRFC3339(new Date(2023, 1, 1)));

    const { data, isLoading } = useGetPortfolioHistoryQuery({
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
            <PortfolioChart data={data} isLoading={isLoading} />
            <PortfolioChartControlPanel
                selectedTimeframe={selectedTimeframe}
                startDate={startDate}
                onTimeframeChange={handleTimeframeChange}
                onStartDateChange={handleStartDateChange}
            />
        </Page>
    );
}
