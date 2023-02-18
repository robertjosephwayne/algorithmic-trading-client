import { CryptoCurrencyMarket } from 'react-ts-tradingview-widgets';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='flex justify-center px-12 py-4 h-4/5'>
                <CryptoCurrencyMarket colorTheme='dark' displayCurrency='USD' />
            </div>
        </Page>
    );
}
