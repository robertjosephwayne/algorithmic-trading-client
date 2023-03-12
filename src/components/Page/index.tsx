import PageHeader from '../PageHeader';

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col w-full h-full p-2 sm:p-4'>
            <PageHeader />
            {children}
        </div>
    );
}
