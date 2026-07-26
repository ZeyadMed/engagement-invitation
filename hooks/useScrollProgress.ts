'use client';

import { useEffect, useState } from 'react';

export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const documentElement = document.documentElement;
            const totalHeight = documentElement.scrollHeight - window.innerHeight;
            const value = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setProgress(value);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return progress;
}
