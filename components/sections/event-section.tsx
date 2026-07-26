'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type EventSectionProps = {
    data: InvitationData;
};

export function EventSection({ data }: EventSectionProps) {
    const cards = [
        { icon: CalendarDays, label: 'Date', value: data.weddingDateLabel },
        { icon: Clock3, label: 'Time', value: data.eventTime },
        { icon: MapPin, label: 'Venue', value: data.venue }
    ];

    return (
        <SectionShell
            eyebrow="Event Details"
            title="All the essentials in one elegant place"
            description="The details are presented as polished glass cards so the important information is easy to scan on any device."
        >
            <div className="grid gap-4 md:grid-cols-3">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        className="rounded-[28px] border border-white/12 bg-[color:var(--surface)] p-6 text-center shadow-glow backdrop-blur-2xl"
                    >
                        <card.icon className="mx-auto h-6 w-6 text-[color:var(--accent-soft)]" />
                        <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/50">{card.label}</p>
                        <p className="mt-3 font-serif text-2xl text-white">{card.value}</p>
                    </motion.div>
                ))}
            </div>
        </SectionShell>
    );
}
