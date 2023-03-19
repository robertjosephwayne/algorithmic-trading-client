import { useGetActivitiesQuery } from '../api/apiSlice';
import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Loader from '../components/Loader';
import Page from '../components/Page';
import pageRoutes from '../routes';
import Sidenav from '../components/Sidenav';

export default function TradeBook() {
    const { isLoading } = useGetActivitiesQuery({});

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            {!isLoading && <ActivitySummaryTable />}
        </Page>
    );
}
