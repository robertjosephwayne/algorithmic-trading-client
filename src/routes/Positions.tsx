import { useGetAccountQuery, useGetPositionsQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';
import { currencyFormatter } from '../utils';

export default function Positions() {
    const { data: accountData, isLoading: accountQueryIsLoading } = useGetAccountQuery(
        {},
        { pollingInterval: 5000 },
    );
    const { isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});

    return (
        <Page>
            {accountQueryIsLoading || positionsQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='p-4'>
                    <span className='font-bold'>Account Summary - Paper Trading</span>
                    <div className='flex flex-col pt-4'>
                        <span>Buying Power: {currencyFormatter(accountData.buying_power)}</span>
                        <span>Cash: {currencyFormatter(accountData.cash)}</span>
                        <span>
                            Position Market Value:{' '}
                            {currencyFormatter(accountData.position_market_value)}
                        </span>
                        <span>Equity: {currencyFormatter(accountData.equity)}</span>
                    </div>
                    <div className='mt-6'>
                        <span className='font-bold'>Positions</span>
                        <PositionSummaryTable />
                    </div>
                </div>
            )}
        </Page>
    );
}
