import { useEffect } from 'react';

// Custom hook to lock and unlock body scrolling
export function useLockBodyScroll(lock: boolean) {
    useEffect(() => {
        if (lock) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = ''; // Clean up on component unmount
        };
    }, [lock]);
}
