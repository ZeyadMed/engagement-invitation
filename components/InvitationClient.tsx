'use client';

import { useRef, useState } from 'react';
import type { InvitationData } from '@/types/invitation';
import { LoadingOverlay } from '@/components/loading-overlay';
import { ScrollProgress } from '@/components/scroll-progress';
import { BackToTopButton } from '@/components/back-to-top-button';
import { HeroSection } from '@/components/sections/hero-section';
import { CountdownSection } from '@/components/sections/countdown-section';
import { StorySection } from '@/components/sections/story-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { MusicSection } from '@/components/sections/music-section';
import { EventSection } from '@/components/sections/event-section';
import { MapSection } from '@/components/sections/map-section';
import { ToolsSection } from '@/components/sections/tools-section';
import { RsvpSection } from '@/components/sections/rsvp-section';
import { QuotesSection } from '@/components/sections/quotes-section';
import { FooterSection } from '@/components/sections/footer-section';
import { SectionDivider } from '@/components/section-divider';

type InvitationClientProps = {
    data: InvitationData;
};

export function InvitationClient({ data }: InvitationClientProps) {
    const invitationRef = useRef<HTMLElement | null>(null);
    const [musicArmed, setMusicArmed] = useState(false);

    return (
        <>
            <LoadingOverlay />
            <ScrollProgress />
            <BackToTopButton />

            <main
                ref={invitationRef}
                className="relative isolate overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(232,190,165,0.15),transparent_35%),linear-gradient(180deg,var(--background-soft)_0%,var(--background)_100%)] text-white"
            >
                <HeroSection data={data} onOpenMusic={() => setMusicArmed(true)} onShare={async () => {
                    if (navigator.share) {
                        await navigator.share({
                            title: `${data.couple.brideName} & ${data.couple.groomName}`,
                            text: data.invitationText,
                            url: data.invitationUrl
                        });
                    }
                }} />

                <SectionDivider />
                <CountdownSection data={data} />
                <SectionDivider />
                <StorySection data={data} />
                <SectionDivider />
                <GallerySection data={data} />
                <SectionDivider />
                <MusicSection data={data} isArmed={musicArmed} onDisarm={() => setMusicArmed(false)} />
                <SectionDivider />
                <EventSection data={data} />
                <SectionDivider />
                <MapSection data={data} />
                <SectionDivider />
                <ToolsSection data={data} invitationRef={invitationRef} />
                <SectionDivider />
                <RsvpSection data={data} />
                <SectionDivider />
                <QuotesSection data={data} />
                <FooterSection data={data} />
            </main>
        </>
    );
}
