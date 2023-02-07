import { Link } from 'react-router-dom';
import CryptoSummaryTable from '../components/CryptoSummaryTable';

export default function Root() {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-end p-4 space-x-4 text-sm text-white'>
                <Link className='w-24 px-2 py-1 text-center text-black bg-white' to='/'>
                    Live Prices
                </Link>

                <Link
                    className='w-24 px-2 py-1 text-center hover:bg-white hover:bg-opacity-20'
                    to='/charts'
                >
                    Charts
                </Link>
            </div>
            <CryptoSummaryTable />
        </div>
    );
}
