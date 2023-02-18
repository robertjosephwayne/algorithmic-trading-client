import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='mx-4 mb-4 border border-white'>
                <ActivitySummaryTable />
            </div>
        </Page>
    );
}
