import Page from '../components/Page';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export default function Charts() {
    return (
        <Page>
            <div className='w-full p-4 h-4/5'>
                <AdvancedRealTimeChart symbol='COINBASE:BTCUSD' autosize={true} />
            </div>
        </Page>
    );
}
