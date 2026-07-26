'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type RsvpSectionProps = {
    data: InvitationData;
};

export function RsvpSection({ data }: RsvpSectionProps) {
    return (
        <SectionShell
            eyebrow="RSVP"
            title="A beautiful note is enough"
            description="This form is intentionally backend-free and designed to feel polished, personal, and easy to use."
        >
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className="mx-auto grid max-w-3xl gap-4 rounded-[30px] border border-white/12 bg-[color:var(--surface)] p-5 shadow-glow backdrop-blur-2xl sm:p-6"
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-white/75">
                        <span className="block text-xs uppercase tracking-[0.35em] text-white/50">Name</span>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-[color:var(--accent)]/60"
                            aria-label="Name"
                        />
                    </label>
                    <label className="space-y-2 text-sm text-white/75">
                        <span className="block text-xs uppercase tracking-[0.35em] text-white/50">Phone</span>
                        <input
                            type="tel"
                            defaultValue={data.phoneNumber}
                            className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-[color:var(--accent)]/60"
                            aria-label="Phone number"
                        />
                    </label>
                </div>
                <label className="space-y-2 text-sm text-white/75">
                    <span className="block text-xs uppercase tracking-[0.35em] text-white/50">Message</span>
                    <textarea
                        rows={5}
                        placeholder="Write a warm message for the couple"
                        className="w-full rounded-[22px] border border-white/10 bg-black/10 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-[color:var(--accent)]/60"
                        aria-label="Message"
                    />
                </label>

                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f4dfd3,#d6aa8a)] px-6 py-4 text-sm font-semibold text-[#241518] transition hover:translate-y-[-1px] sm:w-auto"
                >
                    <Send className="h-4 w-4" />
                    Send RSVP
                </button>
            </motion.form>
        </SectionShell>
    );
}
