import { useSearchParams } from 'next/navigation';
import { FundamentalData } from 'react-ts-tradingview-widgets';
import Page from '../components/Page';
import Sidenav from '../components/Sidenav';
import pageRoutes from '../routes';

export default function Fundamentals() {
    const searchParams = useSearchParams();
    const symbol = searchParams.get('symbol');

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            <FundamentalData
                symbol={symbol || ''}
                autosize={true}
                largeChartUrl='https://trading.robertjosephwayne.com'
            />
        </Page>
    );
}
