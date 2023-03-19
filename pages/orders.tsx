import { useGetOrdersQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import OrderSummaryTable from '../components/OrderSummaryTable';
import pageRoutes from '../routes';
import Sidenav from '../components/Sidenav';

export default function Orders() {
    const { isLoading: ordersQueryIsLoading } = useGetOrdersQuery({});

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            {!ordersQueryIsLoading && <OrderSummaryTable />}
        </Page>
    );
}
