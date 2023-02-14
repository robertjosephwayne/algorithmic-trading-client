import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export default function PageHeaderButton({ path, label }: { path: string; label: string }) {
    return (
        <NavLink
            className={({ isActive }) => {
                return cn('w-24 px-2 py-1 text-center', {
                    'hover:bg-white hover:bg-opacity-20': !isActive,
                    'text-black bg-white': isActive,
                });
            }}
            to={path}
        >
            {label}
        </NavLink>
    );
}
