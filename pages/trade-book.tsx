import { useGetActivitiesQuery } from '../api/apiSlice';
import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Loader from '../components/Loader';
import Page from '../components/Page';

export default function TradeBook() {
    const { isLoading } = useGetActivitiesQuery({});

    return (
        <Page>
            {isLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='w-full h-4/5'>
                    <ActivitySummaryTable />
                </div>
            )}
        </Page>
    );
}
