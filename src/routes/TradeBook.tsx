import { Card } from '@mui/material';
import ActivitySummaryTable from '../components/ActivitySummaryTable';
import Page from '../components/Page';

export default function TradeBook() {
    return (
        <Page>
            <div className='p-4'>
                <Card className='h-full'>
                    <ActivitySummaryTable />
                </Card>
            </div>
        </Page>
    );
}
