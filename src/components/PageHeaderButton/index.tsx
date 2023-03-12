import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './index.css';
import { Box } from '@mui/system';

export default function PageHeaderButton({
    path,
    label,
    leftSideRounded,
    rightSideRounded,
}: {
    path: string;
    label: string;
    leftSideRounded: boolean;
    rightSideRounded: boolean;
}) {
    return (
        <NavLink
            to={path}
            className={({ isActive }) => {
                return cn(
                    'text-center inline-block py-2 my-1 whitespace-nowrap text-xs sm:text-sm font-semibold page-header-button transition-all w-32',
                    {
                        'page-header-button-active': isActive,
                    },
                );
            }}
        >
            {label}
        </NavLink>
    );
}
