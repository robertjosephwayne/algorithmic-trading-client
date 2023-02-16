import { useGetAccountQuery } from '../api/apiSlice';
import AccountSummary from '../components/AccountSummary';
import Loader from '../components/Loader';
import Page from '../components/Page';

export default function Account() {
    const { isLoading: accountQueryIsLoading } = useGetAccountQuery({});

    return (
        <Page>
            {accountQueryIsLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='px-4 pb-4'>
                    <AccountSummary />
                </div>
            )}
        </Page>
    );
}
