import { Card } from '@mui/material';
import { useGetAccountQuery, useGetPositionsQuery } from '../api/apiSlice';
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
                <div className='p-4'>
                    <Card>
                        <PositionSummaryTable />
                    </Card>
                </div>
            )}
        </Page>
    );
}
