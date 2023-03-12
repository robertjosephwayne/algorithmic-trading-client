import Page from '../components/Page';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { Card } from '@mui/material';

export default function Charts() {
    return (
        <Page>
            <div className='w-full p-4 h-4/5'>
                <Card className='h-full'>
                    <AdvancedRealTimeChart symbol='COINBASE:BTCUSD' autosize={true} />
                </Card>
            </div>
        </Page>
    );
}
