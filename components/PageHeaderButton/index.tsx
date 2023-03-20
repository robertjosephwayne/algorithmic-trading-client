import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';

export default function PageHeaderButton({ path, label }: { path: string; label: string }) {
    const router = useRouter();
    const isActive = router.pathname === path;

    return (
        <li>
            <Link
                href={path}
                className={cn('px-3 py-2 rounded-md whitespace-nowrap', {
                    'hover:bg-white hover:bg-opacity-20': !isActive,
                    'bg-white bg-opacity-20': isActive,
                })}
            >
                {label}
            </Link>
        </li>
    );
}
