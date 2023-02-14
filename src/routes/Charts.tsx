import { useEffect, useState } from 'react';
import PriceChart from '../components/PriceChart';
import { useGetBarsQuery } from '../api/apiSlice';
import { formatRFC3339 } from 'date-fns';
import Page from '../components/Page';
import CryptoChartControlPanel from '../components/CryptoChartControlPanel';

export default function Charts() {
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
    const [selectedTimeframe, setSelectedTimeframe] = useState('Month');
    const [startDate, setStartDate] = useState(formatRFC3339(new Date(2015, 0, 1)));
    const [interval] = useState(1);
    const [chartData, setChartData] = useState([]);

    const { data, isLoading, isFetching } = useGetBarsQuery({
        symbol: selectedSymbol,
        timeframe: selectedTimeframe.toLowerCase(),
        start: startDate,
        interval,
    });

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
            <CryptoChartControlPanel
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
