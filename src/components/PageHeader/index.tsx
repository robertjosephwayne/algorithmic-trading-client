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
        <div className='flex justify-end p-4 space-x-4'>
            <nav className='text-sm font-semibold leading-60'>
                <ul className='flex space-x-4'>
                    {pages.map((page) => (
                        <PageHeaderButton key={page.label} path={page.path} label={page.label} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}
