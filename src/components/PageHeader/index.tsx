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
            label: 'Trade Book',
            path: '/trade-book',
        },
    ];

    return (
        <div className='flex justify-end p-4 space-x-4'>
            {pages.map((page) => (
                <PageHeaderButton key={page.label} path={page.path} label={page.label} />
            ))}
        </div>
    );
}
