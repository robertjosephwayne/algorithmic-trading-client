import { Card } from '@mui/material';
import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Page from '../components/Page';

export default function TradeBook() {
    return (
        <Page>
            <div className='w-full p-4 h-4/5'>
                <Card className='h-full'>
                    <ActivitySummaryTable />
                </Card>
            </div>
        </Page>
    );
}
