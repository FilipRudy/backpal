import { useRef, useEffect } from 'react';

export const useOnce = (effect: () => void) => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            effect();
            hasRun.current = true;
        }
    }, [effect]);
};
