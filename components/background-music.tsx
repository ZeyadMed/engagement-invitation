'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

type BackgroundMusicProps = {
    src: string;
};

export function BackgroundMusic({ src }: BackgroundMusicProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const tryPlay = () => {
            audio.play().catch(() => {
                // Autoplay blocked until the user interacts with the page.
            });
        };

        tryPlay();

        const onFirstInteraction = () => {
            tryPlay();
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
            window.removeEventListener('touchstart', onFirstInteraction);
        };

        window.addEventListener('pointerdown', onFirstInteraction);
        window.addEventListener('keydown', onFirstInteraction);
        window.addEventListener('touchstart', onFirstInteraction);

        return () => {
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
            window.removeEventListener('touchstart', onFirstInteraction);
        };
    }, []);

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const nextMuted = !isMuted;
        audio.muted = nextMuted;
        setIsMuted(nextMuted);
    };

    return (
        <>
            <audio ref={audioRef} src={src} loop autoPlay playsInline preload="auto" />
            <motion.button
                type="button"
                onClick={toggleMute}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="fixed bottom-[4.75rem] right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[color:var(--surface-strong)]/90 text-white shadow-glow backdrop-blur-xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/70 sm:bottom-24 sm:right-6"
                aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
                aria-pressed={isMuted}
            >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </motion.button>
        </>
    );
}
