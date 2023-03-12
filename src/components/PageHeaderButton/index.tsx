import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './index.css';

export default function PageHeaderButton({ path, label }: { path: string; label: string }) {
    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) => {
                    return cn(
                        'text-center inline-block w-28 py-1 my-1 rounded-md whitespace-nowrap page-header-button text-sm font-semibold',
                        {
                            'hover:bg-white': !isActive,
                            'bg-white bg-opacity-20': isActive,
                        },
                    );
                }}
            >
                {label}
            </NavLink>
        </li>
    );
}
