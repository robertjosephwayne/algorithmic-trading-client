import {
    getPortfolioHistory,
    getPositions,
    getRunningQueriesThunk,
    useGetPortfolioHistoryQuery,
} from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import ReturnSummaryTable from '../components/ReturnSummaryTable';
import Sidenav from '../components/Sidenav';
import { wrapper } from '../redux/store';
import pageRoutes from '../routes';

export default function Positions() {
    const { isLoading } = useGetPortfolioHistoryQuery({});

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            {!isLoading && <ReturnSummaryTable />}
        </Page>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getPortfolioHistory.initiate({}));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {},
    };
});
