import { useGetPortfolioHistoryQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';
import ReturnSummaryTable from '../components/ReturnSummaryTable';

export default function Positions() {
    const { isLoading } = useGetPortfolioHistoryQuery({});

    return (
        <Page>
            {isLoading ? (
                <Loader fullPage={true} />
            ) : (
                <div className='w-full h-4/5'>
                    <ReturnSummaryTable />
                </div>
            )}
        </Page>
    );
}
