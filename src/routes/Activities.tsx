import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Page from '../components/Page';

export default function Market() {
    return (
        <Page>
            <div className='w-full p-4'>
                <ActivitySummaryTable />
            </div>
        </Page>
    );
}
