import PageHeaderButton from '../PageHeaderButton';

export default function PageHeader() {
    const pages = [
        {
            label: 'Market',
            path: '/',
        },
        {
            label: 'Charts',
            path: '/charts',
        },
        {
            label: 'Positions',
            path: '/positions',
        },
        {
            label: 'Activities',
            path: '/activities',
        },
        {
            label: 'Account',
            path: '/account',
        },
    ];

    return (
        <div className='flex justify-end p-4 space-x-2 text-sm text-white'>
            {pages.map((page) => (
                <PageHeaderButton key={page.label} path={page.path} label={page.label} />
            ))}
        </div>
    );
}
