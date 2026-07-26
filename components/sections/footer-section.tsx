'use client';

import type { InvitationData } from '@/types/invitation';

type FooterSectionProps = {
    data: InvitationData;
};

export function FooterSection({ data }: FooterSectionProps) {
    return (
        <footer className="relative border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-white/70 sm:flex-row sm:text-left">
                <p className="text-sm">Made with ❤️</p>
                <p className="font-serif text-lg text-white">{data.couple.brideName} & {data.couple.groomName}</p>
                <p className="text-sm">{data.weddingDateLabel}</p>
            </div>
        </footer>
    );
}
