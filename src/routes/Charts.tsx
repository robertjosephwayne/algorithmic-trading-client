import { useEffect, useState } from 'react';
import PriceChart from '../components/PriceChart';
import { useGetBarsQuery } from '../api/apiSlice';
import { formatRFC3339, subMinutes } from 'date-fns';
import Page from '../components/Page';
import PriceChartControlPanel from '../components/PriceChartControlPanel';

export default function Charts() {
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
    const [selectedTimeframe, setSelectedTimeframe] = useState('Minute');
    const [startDate, setStartDate] = useState(formatRFC3339(subMinutes(new Date(), 60)));
    const [interval] = useState(1);
    const [chartData, setChartData] = useState([]);

    const { data, isLoading, isFetching } = useGetBarsQuery(
        {
            symbol: selectedSymbol,
            timeframe: selectedTimeframe.toLowerCase(),
            start: startDate,
            interval,
        },
        { pollingInterval: 60000 },
    );

    useEffect(() => {
        if (!data) return;

        const visibleBars = 60;

        const chartData = data.slice(0, visibleBars);
        setChartData(chartData);
    }, [data]);

    const handleStartDateChange = (startDate: string | null) => {
        if (startDate) {
            setStartDate(formatRFC3339(new Date(startDate)));
        }
    };

    const handleSelectedSymbolChange = (symbol: string) => {
        setSelectedSymbol(symbol);
    };

    const handleTimeframeChange = (timeframe: string) => {
        setSelectedTimeframe(timeframe);
    };

    return (
        <Page>
            <PriceChart
                data={chartData}
                isLoading={isFetching || isLoading}
                showTooltipTime={selectedTimeframe === 'Minute' || selectedTimeframe === 'Hour'}
            />
            <PriceChartControlPanel
                selectedSymbol={selectedSymbol}
                selectedTimeframe={selectedTimeframe}
                startDate={startDate}
                onSelectedSymbolChange={handleSelectedSymbolChange}
                onTimeframeChange={handleTimeframeChange}
                onStartDateChange={handleStartDateChange}
            />
        </Page>
    );
}
