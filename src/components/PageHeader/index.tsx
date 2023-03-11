import PageHeaderButton from '../PageHeaderButton';

export default function PageHeader() {
    const pages = [
        {
            label: 'Charts',
            path: '/',
        },
        {
            label: 'Market',
            path: '/market',
        },
        {
            label: 'Positions',
            path: '/positions',
        },
        {
            label: 'Orders',
            path: '/orders',
        },
        {
            label: 'Trade Book',
            path: '/trade-book',
        },
    ];

    return (
        <div className='flex sm:justify-end'>
            <nav className='px-2 py-4 text-xs font-semibold sm:px-4 grow leading-60'>
                <ul className='flex justify-between sm:justify-end sm:space-x-4'>
                    {pages.map((page) => (
                        <PageHeaderButton key={page.label} path={page.path} label={page.label} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}
