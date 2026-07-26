'use client';

import { motion } from 'framer-motion';
import { MapPinned, Navigation } from 'lucide-react';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type MapSectionProps = {
    data: InvitationData;
};

export function MapSection({ data }: MapSectionProps) {
    return (
        <SectionShell
            eyebrow="Google Maps"
            title="Finding the venue should feel effortless"
            description="A large map embed and a direct route button make arrival simple for guests on every device."
        >
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="overflow-hidden rounded-[30px] border border-white/12 bg-white/5 shadow-glow"
                >
                    <iframe
                        title="Google Maps location for the wedding venue"
                        src="https://www.google.com/maps?q=Raz%20Garden&output=embed"
                        className="h-[320px] w-full sm:h-[420px]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="flex flex-col justify-between rounded-[30px] border border-white/12 bg-[color:var(--surface)] p-6 shadow-glow backdrop-blur-2xl"
                >
                    <div>
                        <MapPinned className="h-8 w-8 text-[color:var(--accent-soft)]" />
                        <h3 className="mt-4 font-serif text-3xl text-white">{data.venue}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/72">{data.venueAddress}</p>
                    </div>
                    <a
                        href={data.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f4dfd3,#d6aa8a)] px-6 py-4 text-sm font-semibold text-[#241518] transition hover:translate-y-[-1px]"
                    >
                        <Navigation className="h-4 w-4" />
                        Open in Google Maps
                    </a>
                </motion.div>
            </div>
        </SectionShell>
    );
}
