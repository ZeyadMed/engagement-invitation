'use client';

import { motion } from 'framer-motion';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type StorySectionProps = {
    data: InvitationData;
};

export function StorySection({ data }: StorySectionProps) {
    return (
        <SectionShell
            eyebrow="Our Story"
            title="A timeline written with grace"
            description="Three gentle milestones that brought us here, each one carrying its own blessing."
        >
            <div className="grid gap-4 lg:grid-cols-3">
                {data.storyTimeline.map((item, index) => (
                    <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65, delay: index * 0.1 }}
                        className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[color:var(--surface)] p-6 shadow-glow backdrop-blur-2xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent opacity-70" />
                        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent-soft)]/80">{item.date}</p>
                        <h3 className="mt-4 font-serif text-2xl text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
                    </motion.article>
                ))}
            </div>
        </SectionShell>
    );
}
