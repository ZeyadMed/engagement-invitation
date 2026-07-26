'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export function LoadingOverlay() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 1.05, duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--background)]"
        >
            <div className="flex flex-col items-center gap-4 text-center text-white">
                <motion.div
                    animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                    transition={shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur"
                >
                    <Sparkles className="absolute h-6 w-6 text-[color:var(--accent-soft)]" />
                    <Heart className="h-8 w-8 text-[color:var(--accent)]" />
                </motion.div>
                <p className="text-xs uppercase tracking-[0.5em] text-white/70">Opening invitation</p>
            </div>
        </motion.div>
    );
}
