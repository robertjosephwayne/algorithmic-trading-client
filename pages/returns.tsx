import { useGetPortfolioHistoryQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import ReturnSummaryTable from '../components/ReturnSummaryTable';
import Sidenav from '../components/Sidenav';
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
