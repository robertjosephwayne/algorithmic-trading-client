import { useGetAccountQuery, useGetPositionsQuery } from '../api/apiSlice';
import AccountSummary from '../components/AccountSummary';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';

export default function Positions() {
    const { isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});
    const { isLoading: accountQueryIsLoading } = useGetAccountQuery({});

    return (
        <Page>
            {positionsQueryIsLoading || accountQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <>
                    <div className='px-4 pb-4'>
                        <AccountSummary />
                    </div>
                    <div className='mx-4 mb-4 border border-white'>
                        <PositionSummaryTable />
                    </div>
                </>
            )}
        </Page>
    );
}
