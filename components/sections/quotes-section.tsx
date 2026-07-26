'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type QuotesSectionProps = {
    data: InvitationData;
};

export function QuotesSection({ data }: QuotesSectionProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % data.quotes.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [data.quotes.length]);

    return (
        <SectionShell
            eyebrow="Romantic Quotes"
            title="Words that linger softly"
            description="An animated quote panel to keep the atmosphere warm and memorable."
        >
            <div className="mx-auto max-w-4xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.45 }}
                        className="rounded-[30px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,248,244,0.12),rgba(255,248,244,0.05))] p-8 text-center shadow-glow backdrop-blur-2xl sm:p-10"
                    >
                        <Quote className="mx-auto h-8 w-8 text-[color:var(--accent-soft)]" />
                        <p className="mt-6 font-serif text-2xl leading-9 text-white sm:text-3xl sm:leading-[1.5]">
                            {data.quotes[index]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </SectionShell>
    );
}
