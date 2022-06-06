import Link from 'next/link';

export default function IndexPage() {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/cryptocurrency/listings/latest">
                        <a>Latest Listings</a>
                    </Link>
                </li>
                <li>
                    <Link href="/cryptocurrency/categories">
                        <a>Categories</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
