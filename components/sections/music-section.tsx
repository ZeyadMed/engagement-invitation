'use client';

import { motion } from 'framer-motion';
import { Pause, Play, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type MusicSectionProps = {
    data: InvitationData;
    isArmed: boolean;
    onDisarm: () => void;
};

export function MusicSection({ data, isArmed, onDisarm }: MusicSectionProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLInputElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoaded = () => setDuration(audio.duration || 0);
        const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
        const onEnded = () => setIsPlaying(false);
        const onError = () => setHasError(true);

        audio.addEventListener('loadedmetadata', onLoaded);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('error', onError);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('error', onError);
        };
    }, []);

    useEffect(() => {
        if (!isArmed || !audioRef.current) return;

        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
        onDisarm();
    }, [isArmed, onDisarm]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    };

    const seek = (value: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    return (
        <SectionShell
            eyebrow="Music"
            title="A gentle soundtrack for the evening"
            description="An elegant audio player with loop, progress, and volume controls. Replace the placeholder MP3 in public/music."
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className="grid gap-4 rounded-[30px] border border-white/12 bg-[color:var(--surface)] p-5 shadow-glow backdrop-blur-2xl sm:p-6 lg:grid-cols-[1.2fr_0.8fr]"
            >
                <audio ref={audioRef} src={data.backgroundMusicUrl} loop preload="metadata" />
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent-soft)]/80">Now playing</p>
                    <h3 className="mt-3 font-serif text-2xl text-white">Our wedding melody</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">
                        This floating player is intentionally understated, letting the atmosphere breathe while the music supports the mood.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={togglePlay}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4dfd3,#d6aa8a)] text-[#241518] transition hover:scale-105"
                            aria-label={isPlaying ? 'Pause music' : 'Play music'}
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <div className="space-y-1 text-sm text-white/72">
                            <p>{hasError ? 'Replace the placeholder MP3 before launch.' : isPlaying ? 'Music is playing softly.' : 'Tap play for background music.'}</p>
                            <p>
                                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} /{' '}
                                {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 rounded-[24px] border border-white/10 bg-black/10 p-4">
                    <label className="space-y-2 text-sm text-white/75">
                        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
                            <Volume2 className="h-4 w-4" /> Volume
                        </span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(event) => setVolume(Number(event.target.value))}
                            className="w-full accent-[color:var(--accent)]"
                            aria-label="Music volume"
                        />
                    </label>

                    <label className="space-y-2 text-sm text-white/75">
                        <span className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
                            <span>Progress</span>
                            <span>{duration ? `${Math.round((currentTime / duration) * 100)}%` : '0%'}</span>
                        </span>
                        <input
                            ref={progressRef}
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.01"
                            value={currentTime}
                            onChange={(event) => seek(Number(event.target.value))}
                            className="w-full accent-[color:var(--accent-soft)]"
                            aria-label="Music progress"
                        />
                    </label>
                </div>
            </motion.div>
        </SectionShell>
    );
}
