import { useGetAccountQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import { currencyFormatter } from '../utils';

export default function Sandbox() {
    const { data, isLoading } = useGetAccountQuery({});

    return (
        <Page>
            {isLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='p-4'>Buying Power: {currencyFormatter(data.buying_power)}</div>
            )}
        </Page>
    );
}
