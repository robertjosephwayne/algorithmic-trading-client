import { useGetAccountQuery } from '../../api/apiSlice';
import { currencyFormatter } from '../../utils';

export default function AccountSummary() {
    const { data: accountData } = useGetAccountQuery({}, { pollingInterval: 5000 });
    return (
        <>
            <span className='font-bold'>Account Summary - Paper Trading</span>
            <div className='flex flex-col pt-4'>
                <span>Buying Power: {currencyFormatter(accountData.buying_power)}</span>
                <span>Cash: {currencyFormatter(accountData.cash)}</span>
                <span>
                    Position Market Value: {currencyFormatter(accountData.position_market_value)}
                </span>
                <span>Equity: {currencyFormatter(accountData.equity)}</span>
            </div>
        </>
    );
}
