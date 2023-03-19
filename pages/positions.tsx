import {
    getAccount,
    getPositions,
    getRunningQueriesThunk,
    useGetAccountQuery,
    useGetPositionsQuery,
} from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';
import Sidenav from '../components/Sidenav';
import { wrapper } from '../redux/store';
import pageRoutes from '../routes';

export default function Positions() {
    const { isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});
    const { isLoading: accountQueryIsLoading } = useGetAccountQuery({});

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            <PositionSummaryTable />
        </Page>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getPositions.initiate({}));
    store.dispatch(getAccount.initiate({}));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {},
    };
});
