import { Card } from '@mui/material';
import { CryptoCurrencyMarket } from 'react-ts-tradingview-widgets';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='w-full p-4 h-4/5'>
                <Card className='h-full'>
                    <CryptoCurrencyMarket displayCurrency='USD' autosize={true} />
                </Card>
            </div>
        </Page>
    );
}
