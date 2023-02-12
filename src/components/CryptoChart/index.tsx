import { PuffLoader } from 'react-spinners';
import { XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const CustomTooltip = ({ active, payload, showTime }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className='p-2 bg-black'>
                <p className='font-bold'>{dateFormatter(payload[0].payload.timestamp, showTime)}</p>
                <div>
                    <div>High: {currencyFormatter(payload[0].payload.high)}</div>
                    <div>Low: {currencyFormatter(payload[0].payload.low)}</div>
                    <div>Open: {currencyFormatter(payload[0].payload.openClose[0])}</div>
                    <div>Close: {currencyFormatter(payload[0].payload.openClose[1])}</div>
                </div>
            </div>
        );
    }

    return null;
};

const Candlestick = (props: any) => {
    const {
        x,
        y,
        width,
        height,
        // low,
        // high,
        openClose: [open, close],
    } = props;
    const isGrowing = open < close;
    const color = isGrowing ? 'green' : 'red';
    // const ratio = Math.abs(height / (open - close));

    return (
        <g stroke={color} fill='black' strokeWidth='2'>
            <path
                d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
            />
            {/* bottom line */}
            {/* {isGrowing ? (
                <path
                    d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
                />
            ) : (
                <path
                    d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
                />
            )} */}
            {/* top line */}
            {/* {isGrowing ? (
                <path
                    d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
                />
            ) : (
                <path
                    d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
                />
            )} */}
        </g>
    );
};

const prepareData = (data: any) => {
    if (!data) return [];

    return data.map(({ open, close, ...other }: any) => {
        return {
            ...other,
            openClose: [open, close],
        };
    });
};

export default function CryptoChart({
    data,
    isLoading,
    showTooltipTime,
}: {
    data: any;
    isLoading: boolean;
    showTooltipTime?: boolean;
}) {
    const [maxValue, setMaxValue] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!data) return;

        const chartData = prepareData(data);
        setChartData(chartData);

        const minValue = chartData.reduce(
            (minValue: any, { low, openClose: [open, close] }: any) => {
                const currentMin = Math.min(low, open, close);
                return minValue === null || currentMin < minValue ? currentMin : minValue;
            },
            null,
        );

        const maxValue = chartData.reduce(
            (maxValue: any, { high, openClose: [open, close] }: any) => {
                const currentMax = Math.max(high, open, close);
                return currentMax > maxValue ? currentMax : maxValue;
            },
            minValue,
        );

        setMaxValue(maxValue);
    }, [data]);

    return (
        <>
            <div className='flex items-center justify-center h-full text-white'>
                {isLoading ? (
                    <div
                        className='flex flex-col items-center justify-center text-white'
                        style={{ width: '80%', height: '80%' }}
                    >
                        <PuffLoader color='white' />
                    </div>
                ) : (
                    <ResponsiveContainer
                        className='text-white'
                        width='80%'
                        height='80%'
                        minHeight='200px'
                        minWidth='200px'
                    >
                        <BarChart width={300} height={300} data={chartData}>
                            <XAxis
                                dataKey='timestamp'
                                tickFormatter={(value) => dateFormatter(value, false)}
                                interval='preserveStartEnd'
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[0, maxValue]}
                                tickFormatter={currencyFormatter}
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                                padding={{ bottom: 3 }}
                                allowDataOverflow={true}
                            />
                            <Tooltip
                                formatter={tooltipFormatter}
                                content={<CustomTooltip showTime={showTooltipTime} />}
                                cursor={{ fill: 'white', opacity: 0.2 }}
                            />
                            <Bar dataKey='openClose' fill='#8884d8' shape={<Candlestick />}>
                                {data.map((entry: any, index: any) => (
                                    <Cell key={`cell-${index}`} fill={'white'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </>
    );
}

function currencyFormatter(value: any): string {
    if (!value) return '';

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: 0,
    });
}

function dateFormatter(value: any, showTime: boolean): string {
    if (!value) return '';

    let formattedDate = format(new Date(value), 'M/d/yyyy');
    if (showTime) {
        formattedDate = format(new Date(value), 'M/d/yyyy, pp');
    }

    return formattedDate;
}

function tooltipFormatter(value: any) {
    return currencyFormatter(value);
}
