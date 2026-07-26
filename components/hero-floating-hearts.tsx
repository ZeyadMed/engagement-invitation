import { motion, useReducedMotion } from 'framer-motion';

const hearts = [
    { left: '10%', top: '18%', size: 22, delay: 0 },
    { left: '22%', top: '58%', size: 14, delay: 0.8 },
    { left: '74%', top: '20%', size: 18, delay: 0.4 },
    { left: '82%', top: '72%', size: 24, delay: 1.1 },
    { left: '52%', top: '12%', size: 12, delay: 1.6 }
];

export function HeroFloatingHearts() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={`${heart.left}-${heart.top}`}
                    className="absolute text-[color:var(--accent-soft)]/45"
                    style={{ left: heart.left, top: heart.top }}
                    animate={shouldReduceMotion ? { opacity: 0.35 } : { y: [0, -18, 0], opacity: [0.3, 0.75, 0.3], scale: [0.95, 1.08, 0.95] }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 6 + heart.delay, repeat: Infinity, delay: heart.delay, ease: 'easeInOut' }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width={heart.size} height={heart.size} aria-hidden>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
