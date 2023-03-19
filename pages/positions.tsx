import { useGetAccountQuery, useGetPositionsQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import PositionSummaryTable from '../components/PositionSummaryTable';
import Sidenav from '../components/Sidenav';
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
