import Page from '../components/Page';
import Providers from '../components/Providers';
import './index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head></head>
            <body>
                <Providers>
                    <Page>{children}</Page>
                </Providers>
            </body>
        </html>
    );
}

export const metadata = {
    title: 'Trading Dashboard',
    description: 'Trading Dashboard',
};
