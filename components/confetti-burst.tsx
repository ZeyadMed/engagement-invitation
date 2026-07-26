'use client';

import { motion, useReducedMotion } from 'framer-motion';

const pieces = Array.from({ length: 14 }, (_, index) => ({
    left: `${6 + ((index * 7) % 86)}%`,
    top: `${8 + ((index * 11) % 52)}%`,
    rotate: (index * 23) % 180,
    delay: (index % 5) * 0.1,
    duration: 2.8 + (index % 4) * 0.2
}));

export function ConfettiBurst() {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return null;
    }

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {pieces.map((piece, index) => (
                <motion.span
                    key={index}
                    className="absolute h-2.5 w-2.5 rounded-sm bg-[color:var(--accent-soft)] shadow-[0_0_18px_rgba(244,216,202,0.5)]"
                    style={{ left: piece.left, top: piece.top, rotate: piece.rotate }}
                    initial={{ opacity: 0, scale: 0.4, y: 0 }}
                    animate={{ opacity: [0, 1, 0], y: [0, -60, -140], x: [0, index % 2 === 0 ? 16 : -16, 0], rotate: [piece.rotate, piece.rotate + 180] }}
                    transition={{ delay: piece.delay, duration: piece.duration, repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' }}
                />
            ))}
        </div>
    );
}
