'use client';

import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function BackToTopButton() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ scale }}
            className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[color:var(--surface-strong)]/90 text-white shadow-glow backdrop-blur-xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/70 sm:bottom-6 sm:right-6"
            aria-label="Back to top"
        >
            <ArrowUp className="h-5 w-5" />
        </motion.button>
    );
}
