import { useGetOrdersQuery } from '../../api/apiSlice';
import Loader from '../../components/Loader';
import Page from '../../components/Page';
import OrderSummaryTable from '../../components/OrderSummaryTable';

export default function Orders() {
    // const { isLoading: ordersQueryIsLoading } = useGetOrdersQuery({});

    return (
        <div className='w-full h-4/5'>
            <OrderSummaryTable />
        </div>
    );
}
