'use client';

import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export default function Charts() {
    return (
        <div className='w-full h-4/5'>
            <AdvancedRealTimeChart theme='dark' autosize={true} interval='W' />
        </div>
    );
}
