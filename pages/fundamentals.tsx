import { useSearchParams } from 'next/navigation';
import { FundamentalData } from 'react-ts-tradingview-widgets';
import Page from '../components/Page';

export default function Fundamentals() {
    const searchParams = useSearchParams();
    const symbol = searchParams.get('symbol');

    return (
        <Page>
            <div className='justify-center w-full h-4/5'>
                <FundamentalData
                    symbol={symbol || ''}
                    colorTheme='dark'
                    autosize={true}
                    largeChartUrl='https://trading.robertjosephwayne.com'
                />
            </div>
        </Page>
    );
}
