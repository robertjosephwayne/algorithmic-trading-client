import Page from '../components/Page';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export default function Charts() {
    return (
        <Page>
            <div className='w-full h-4/5'>
                <AdvancedRealTimeChart theme='dark' symbol='COINBASE:BTCUSD' autosize={true} />
            </div>
        </Page>
    );
}
