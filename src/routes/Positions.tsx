import { useGetPositionsQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';

export default function Positions() {
    const { isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});

    return (
        <Page>
            {positionsQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='px-4 pb-4'>
                    <PositionSummaryTable />
                </div>
            )}
        </Page>
    );
}
