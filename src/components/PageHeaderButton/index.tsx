import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export default function PageHeaderButton({ path, label }: { path: string; label: string }) {
    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) => {
                    return cn('px-3 py-2 rounded-md ', {
                        'hover:bg-white hover:bg-opacity-20': !isActive,
                        'bg-white bg-opacity-20': isActive,
                    });
                }}
            >
                {label}
            </NavLink>
        </li>
    );
}
