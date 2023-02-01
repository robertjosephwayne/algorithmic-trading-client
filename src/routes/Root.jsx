import { Link } from 'react-router-dom';
import CryptoSummaryTable from '../components/CryptoSummaryTable';

export default function Root() {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-end p-4 text-white'>
                <Link to='/charts'>Charts</Link>
            </div>
            <CryptoSummaryTable />
        </div>
    );
}
