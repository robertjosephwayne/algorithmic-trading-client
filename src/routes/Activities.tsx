import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='px-4 pb-4'>
                <ActivitySummaryTable />
            </div>
        </Page>
    );
}
