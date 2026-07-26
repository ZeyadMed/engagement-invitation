import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { invitationData } from '@/data/invitation';

export const metadata: Metadata = {
    title: `${invitationData.couple.groomName} & ${invitationData.couple.brideName} | Engagement Invitation`,
    description: invitationData.invitationText,
    metadataBase: new URL('https://zeyad-eman.invitation'),
    openGraph: {
        title: `${invitationData.couple.groomName} & ${invitationData.couple.brideName}`,
        description: invitationData.invitationText,
        type: 'website'
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
