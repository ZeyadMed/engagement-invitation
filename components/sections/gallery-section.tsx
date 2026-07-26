'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import type { InvitationData } from '@/types/invitation';
import { SectionShell } from '@/components/section-shell';

type GallerySectionProps = {
    data: InvitationData;
};

export function GallerySection({ data }: GallerySectionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const touchStartX = useRef<number | null>(null);
    const activeImage = activeIndex !== null ? data.galleryImages[activeIndex] : null;

    const openLightbox = (index: number) => setActiveIndex(index);
    const closeLightbox = () => setActiveIndex(null);
    const goPrev = () => setActiveIndex((current) => (current === null ? null : (current - 1 + data.galleryImages.length) % data.galleryImages.length));
    const goNext = () => setActiveIndex((current) => (current === null ? null : (current + 1) % data.galleryImages.length));

    const columns = useMemo(
        () => data.galleryImages.map((image, index) => ({ image, index })),
        [data.galleryImages]
    );

    const handleTouchStart = (clientX: number) => {
        touchStartX.current = clientX;
    };

    const handleTouchEnd = (clientX: number) => {
        if (touchStartX.current === null) return;

        const delta = clientX - touchStartX.current;
        if (Math.abs(delta) > 36) {
            if (delta > 0) {
                goPrev();
            } else {
                goNext();
            }
        }

        touchStartX.current = null;
    };

    return (
        <SectionShell
            eyebrow="Couple Gallery"
            title="A collection of tender moments"
            description="A masonry-style gallery with a lightbox built for graceful viewing on every screen size."
        >
            <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
                {columns.map(({ image, index }) => (
                    <motion.button
                        key={image.src}
                        type="button"
                        onClick={() => openLightbox(index)}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: index * 0.05 }}
                        className="group relative mb-4 w-full overflow-hidden rounded-[30px] border border-white/12 bg-white/5 shadow-glow outline-none"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-100 transition group-hover:opacity-90" />
                        </div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {activeImage ? (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') closeLightbox();
                            if (event.key === 'ArrowLeft') goPrev();
                            if (event.key === 'ArrowRight') goNext();
                        }}
                        onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
                        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
                        role="dialog"
                        aria-modal="true"
                        tabIndex={-1}
                    >
                        <motion.div
                            initial={{ scale: 0.94, y: 24 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.94, y: 24 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#171113] shadow-glow"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="relative aspect-[4/5] w-full sm:aspect-[16/12]">
                                <Image
                                    src={activeImage.src}
                                    alt={activeImage.alt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4 text-white/85">
                                <p className="text-sm">Swipe left or right on mobile to navigate.</p>
                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={goPrev} className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10" aria-label="Previous image">
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button type="button" onClick={goNext} className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10" aria-label="Next image">
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                    <button type="button" onClick={closeLightbox} className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10" aria-label="Close gallery">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </SectionShell>
    );
}
