import { CryptoCurrencyMarket } from 'react-ts-tradingview-widgets';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='w-full h-4/5'>
                <CryptoCurrencyMarket colorTheme='dark' displayCurrency='USD' autosize={true} />
            </div>
        </Page>
    );
}
