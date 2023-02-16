import { useGetAccountQuery, useGetPositionsQuery } from '../api/apiSlice';
import AccountSummary from '../components/AccountSummary';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';

export default function Positions() {
    const { isLoading: accountQueryIsLoading } = useGetAccountQuery({});
    const { isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});

    return (
        <Page>
            {accountQueryIsLoading || positionsQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='p-4'>
                    <div className='mt-6'>
                        <AccountSummary />
                        <PositionSummaryTable />
                    </div>
                </div>
            )}
        </Page>
    );
}
