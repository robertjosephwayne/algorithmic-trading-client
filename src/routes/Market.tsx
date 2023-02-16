import MarketSummaryTable from '../components/MarketSummaryTable';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='px-4 pb-4'>
                <MarketSummaryTable />
            </div>
        </Page>
    );
}
