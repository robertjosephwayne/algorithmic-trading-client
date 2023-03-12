import { useGetOrdersQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import OrderSummaryTable from '../components/OrderSummaryTable';
import { Card } from '@mui/material';

export default function Orders() {
    const { isLoading: ordersQueryIsLoading } = useGetOrdersQuery({});

    return (
        <Page>
            {ordersQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='p-4'>
                    <Card className='h-full'>
                        <OrderSummaryTable />
                    </Card>
                </div>
            )}
        </Page>
    );
}
