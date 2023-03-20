import { getActivities, getRunningQueriesThunk, useGetActivitiesQuery } from '../api/apiSlice';
import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Page from '../components/Page';
import pageRoutes from '../routes';
import Sidenav from '../components/Sidenav';
import { wrapper } from '../redux/store';

export default function TradeBook() {
    const { isLoading } = useGetActivitiesQuery({});

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            {!isLoading && <ActivitySummaryTable />}
        </Page>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getActivities.initiate({}));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {},
    };
});
