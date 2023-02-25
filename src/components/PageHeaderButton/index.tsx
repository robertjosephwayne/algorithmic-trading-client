import { NavLink, useMatch } from 'react-router-dom';
import { Button } from '@mui/material';

export default function PageHeaderButton({ path, label }: { path: string; label: string }) {
    const match = useMatch(path);

    return (
        <NavLink to={path}>
            <Button className='w-32' variant={match ? 'contained' : 'outlined'} size='small'>
                {label}
            </Button>
        </NavLink>
    );
}
