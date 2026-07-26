'use client';

import { motion } from 'framer-motion';
import { CalendarDays, ChevronDown, Heart, MapPin, Share2 } from 'lucide-react';
import type { InvitationData } from '@/types/invitation';
import { ConfettiBurst } from '@/components/confetti-burst';
import { FloatingDecor } from '@/components/floating-decor';
import { HeroFloatingHearts } from '@/components/hero-floating-hearts';

type HeroSectionProps = {
    data: InvitationData;
    onOpenMusic: () => void;
    onShare: () => void;
};

export function HeroSection({ data, onOpenMusic, onShare }: HeroSectionProps) {
    const jumpToContent = () => {
        document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="relative min-h-[100svh] overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-28 blur-[1px] scale-105 sm:scale-100"
                style={{ backgroundImage: `url(${data.heroBackgroundImage})` }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,222,208,0.2),transparent_40%),linear-gradient(180deg,rgba(18,15,16,0.28)_0%,rgba(18,15,16,0.92)_100%)]" />
            <FloatingDecor />
            <HeroFloatingHearts />
            <ConfettiBurst />

            <div className="relative mx-auto flex min-h-[calc(100svh-2rem)] max-w-6xl flex-col justify-between">
                <header className="flex items-start justify-between gap-3 pt-2 text-white/90 sm:items-center sm:pt-6">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl sm:gap-3 sm:px-4"
                    >
                        <span className="font-serif text-sm tracking-[0.32em] text-[color:var(--accent-soft)] sm:text-lg sm:tracking-[0.3em]">{data.logoLabel}</span>
                    </motion.div>
                    <motion.button
                        type="button"
                        onClick={onShare}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/10 sm:px-4"
                        aria-label="Share invitation"
                    >
                        <Share2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Share</span>
                    </motion.button>
                </header>

                <div className="mx-auto flex w-full max-w-4xl flex-1 items-center py-8 text-center sm:py-12 lg:py-16">
                    <div className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className="mx-auto mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.42em] text-white/75 backdrop-blur-xl sm:gap-3 sm:text-xs sm:tracking-[0.5em]"
                        >
                            <CalendarDays className="h-3.5 w-3.5 text-[color:var(--accent-soft)]" />
                            {data.weddingDateLabel}
                            <MapPin className="h-3.5 w-3.5 text-[color:var(--accent-soft)]" />
                            {data.venue}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.95, delay: 0.1 }}
                            className="mx-auto max-w-[12ch] text-balance font-serif text-[clamp(3.15rem,14vw,7.9rem)] leading-[0.92] tracking-tight text-white"
                        >
                            <span className="block">{data.couple.brideName}</span>
                            <span className="my-2 inline-flex items-center justify-center text-[color:var(--accent)] sm:my-3">
                                <Heart className="h-7 w-7 fill-current sm:h-12 sm:w-12" />
                            </span>
                            <span className="block">{data.couple.groomName}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            className="mx-auto mt-5 max-w-2xl text-balance text-sm leading-7 text-white/75 sm:mt-6 sm:text-base sm:leading-8"
                        >
                            {data.heroQuote}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.28 }}
                            className="mx-auto mt-4 max-w-xl text-balance text-sm leading-7 text-[color:var(--accent-soft)]/85 sm:text-base"
                        >
                            {data.invitationText}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.38 }}
                            className="mt-8 grid gap-3 sm:flex sm:flex-row sm:items-center sm:justify-center"
                        >
                            <button
                                type="button"
                                onClick={jumpToContent}
                                className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4dfd3,#d6aa8a)] px-7 py-4 text-sm font-semibold text-[#26191a] shadow-glow transition hover:translate-y-[-1px] sm:w-auto"
                            >
                                Enter the Invitation
                            </button>
                            <button
                                type="button"
                                onClick={onOpenMusic}
                                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10 sm:w-auto"
                            >
                                Start Music
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, delay: 0.46 }}
                            className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
                        >
                            {[
                                { label: 'Date', value: data.weddingDateLabel },
                                { label: 'Time', value: data.eventTime },
                                { label: 'Venue', value: data.venue }
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-xl"
                                >
                                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/50">{item.label}</p>
                                    <p className="mt-2 font-serif text-lg text-white sm:text-xl">{item.value}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <motion.button
                    type="button"
                    onClick={jumpToContent}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/80 backdrop-blur-xl sm:mb-4 sm:text-xs sm:tracking-[0.45em]"
                >
                    Scroll
                    <ChevronDown className="h-4 w-4" />
                </motion.button>
            </div>
        </section>
    );
}
