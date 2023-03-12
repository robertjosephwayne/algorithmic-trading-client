import { PuffLoader } from 'react-spinners';
import cn from 'classnames';

export default function Loader({ fullPage }: { fullPage?: boolean }) {
    return (
        <div
            className={cn('flex flex-col items-center justify-center', {
                'absolute w-screen h-screen': !!fullPage,
            })}
        >
            <PuffLoader />
        </div>
    );
}
