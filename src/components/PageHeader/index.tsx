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
            label: 'Trade Book',
            path: '/trade-book',
        },
    ];

    return (
        <div className='flex p-4 sm:justify-end'>
            <nav className='text-sm font-semibold grow leading-60'>
                <ul className='flex justify-between sm:justify-end sm:space-x-4'>
                    {pages.map((page) => (
                        <PageHeaderButton key={page.label} path={page.path} label={page.label} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}
