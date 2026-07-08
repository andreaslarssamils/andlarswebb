import { JetBrains_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import Menu from '../components/Menu';
import '../index.css';
// import './globals.css'

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
});

export default async function RootLayout({ children, ...props }) {
    const headerList = await headers();
    const pathname = headerList.get('x-pathname') || '';
    // const data = await getPage({
    //     path: pathname,
    //     searchParams: {},
    // })

    return (
        <html lang="en" className={jetbrainsMono.variable}>
            <body>
                <Menu />
                {children}
            </body>
        </html>
    );
}
