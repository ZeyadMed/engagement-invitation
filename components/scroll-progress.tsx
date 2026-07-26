'use client';

import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
    const progress = useScrollProgress();

    return (
        <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
            <motion.div
                className="h-full origin-left bg-gradient-to-r from-[#f1d7c8] via-[#f6e9df] to-[#d8b195]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
