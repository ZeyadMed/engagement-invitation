'use client';

import { useEffect, useState } from 'react';

type CountdownState = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function calculateCountdown(targetDate: Date): CountdownState {
    const now = Date.now();
    const difference = Math.max(targetDate.getTime() - now, 0);
    const secondsTotal = Math.floor(difference / 1000);

    return {
        days: Math.floor(secondsTotal / 86400),
        hours: Math.floor((secondsTotal % 86400) / 3600),
        minutes: Math.floor((secondsTotal % 3600) / 60),
        seconds: secondsTotal % 60
    };
}

export function useCountdown(targetDate: string) {
    const [countdown, setCountdown] = useState<CountdownState>(() =>
        calculateCountdown(new Date(targetDate))
    );

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCountdown(calculateCountdown(new Date(targetDate)));
        }, 1000);

        return () => window.clearInterval(timer);
    }, [targetDate]);

    return countdown;
}
