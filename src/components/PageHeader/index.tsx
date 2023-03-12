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
        <div className='flex justify-center'>
            {pages.map((page, index) => (
                <PageHeaderButton
                    key={page.label}
                    path={page.path}
                    label={page.label}
                    leftSideRounded={index === 0}
                    rightSideRounded={index === pages.length - 1}
                />
            ))}
        </div>
    );
}
