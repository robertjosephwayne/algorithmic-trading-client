import Link from 'next/link';

export default function IndexPage() {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/fundamentals/income-statement">
                        <a>Income Statements</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
