'use client';

import { motion } from 'framer-motion';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';
import { useCountdown } from '@/hooks/useCountdown';
import { formatCountdownValue } from '@/lib/utils';

type CountdownSectionProps = {
    data: InvitationData;
};

const items = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

export function CountdownSection({ data }: CountdownSectionProps) {
    const countdown = useCountdown(data.weddingDateISO);
    const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

    return (
        <SectionShell
            eyebrow="Count the Moments"
            title="Our special day is drawing near"
            description="Every passing second carries us one step closer to the celebration."
            className="pt-10"
        >
            <div id="countdown" className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {items.map((label, index) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        className="rounded-[28px] border border-white/12 bg-[color:var(--surface)] p-5 text-center shadow-glow backdrop-blur-2xl sm:p-6"
                    >
                        <p className="font-serif text-4xl text-[color:var(--accent-soft)] sm:text-5xl lg:text-6xl">
                            {formatCountdownValue(values[index])}
                        </p>
                        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/60">{label}</p>
                    </motion.div>
                ))}
            </div>
        </SectionShell>
    );
}
