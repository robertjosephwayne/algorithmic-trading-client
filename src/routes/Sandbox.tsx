import { useEffect, useState } from 'react';
import { useGetAccountQuery, useGetPositionsQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';
import { currencyFormatter } from '../utils';

export default function Sandbox() {
    const { data: accountData, isLoading: accountQueryIsLoading } = useGetAccountQuery({});
    const { data: positionsData, isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});

    return (
        <Page>
            {accountQueryIsLoading || positionsQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='p-4'>
                    <span className='font-bold'>Account Summary</span>
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
                        {positionsData.map((position: any) => {
                            const totalProfitLoss =
                                parseInt(position.market_value) - parseInt(position.cost_basis);

                            // return (

                            // <div className='flex flex-col pt-4' key={position.symbol}>
                            //     <span>Symbol: {position.symbol}</span>
                            //     <span>Quantity: {position.quantity}</span>
                            //     <span>Side: {position.side}</span>
                            //     <span>Exchange: {position.exchange}</span>
                            //     <span>
                            //         Cost Basis: {currencyFormatter(position.cost_basis)}
                            //     </span>
                            //     <span>
                            //         Market Value: {currencyFormatter(position.market_value)}
                            //     </span>
                            //     <span>Total P/L: {currencyFormatter(totalProfitLoss)}</span>
                            // </div>
                            // );
                        })}
                    </div>
                </div>
            )}
        </Page>
    );
}
