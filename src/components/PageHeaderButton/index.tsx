import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './index.css';
import { Box } from '@mui/system';

export default function PageHeaderButton({ path, label }: { path: string; label: string }) {
    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) => {
                    return cn(
                        'text-center inline-block w-28 py-1 my-1 rounded-full whitespace-nowrap page-header-button text-sm text-white font-semibold transition-all hover:shadow-md duration-200 ease-in-out',
                    );
                }}
            >
                {label}
            </NavLink>
        </li>
    );
}
