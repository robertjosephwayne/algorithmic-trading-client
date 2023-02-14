import PageHeaderButton from '../PageHeaderButton';

export default function PageHeader() {
    const pages = [
        {
            label: 'Live Prices',
            path: '/',
        },
        {
            label: 'Charts',
            path: '/charts',
        },
    ];

    return (
        <div className='flex justify-end p-4 space-x-4 text-sm text-white'>
            {pages.map((page) => (
                <PageHeaderButton key={page.label} path={page.path} label={page.label} />
            ))}
        </div>
    );
}
