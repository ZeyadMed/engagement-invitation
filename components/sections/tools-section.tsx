'use client';

import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { Check, Copy, Download, ImageDown, QrCode, Share2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import type { InvitationData } from '@/types/invitation';
import { createGoogleCalendarUrl, createIcsContent } from '@/lib/calendar';
import { SectionShell } from '@/components/section-shell';
import type { RefObject } from 'react';

type ToolsSectionProps = {
    data: InvitationData;
    invitationRef: RefObject<HTMLElement | null>;
};

export function ToolsSection({ data, invitationRef }: ToolsSectionProps) {
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const googleCalendarUrl = useMemo(() => createGoogleCalendarUrl(data.calendarEvent), [data.calendarEvent]);

    useEffect(() => {
        QRCode.toDataURL(data.invitationUrl, {
            errorCorrectionLevel: 'M',
            margin: 1,
            width: 260,
            color: {
                dark: '#241518',
                light: '#f7ede7'
            }
        })
            .then(setQrDataUrl)
            .catch(() => setQrDataUrl(''));
    }, [data.invitationUrl]);

    const copyLink = async () => {
        await navigator.clipboard.writeText(data.invitationUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    const shareInvitation = async () => {
        if (navigator.share) {
            await navigator.share({
                title: `${data.couple.brideName} & ${data.couple.groomName}`,
                text: data.invitationText,
                url: data.invitationUrl
            });
            return;
        }

        await copyLink();
    };

    const downloadImage = async () => {
        if (!invitationRef.current) return;
        const blob = await htmlToImage.toBlob(invitationRef.current, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#120f10'
        });

        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'eman-zeyad-invitation.png';
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadPdf = async () => {
        if (!invitationRef.current) return;

        const dataUrl = await htmlToImage.toPng(invitationRef.current, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#120f10'
        });

        const image = new window.Image();
        image.src = dataUrl;
        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const pdf = new jsPDF({ orientation: image.width > image.height ? 'l' : 'p', unit: 'px', format: [image.width, image.height] });
        pdf.addImage(dataUrl, 'PNG', 0, 0, image.width, image.height);
        pdf.save('eman-zeyad-invitation.pdf');
    };

    const downloadIcs = () => {
        const blob = new Blob([createIcsContent(data.calendarEvent)], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'eman-zeyad-engagement.ics';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <SectionShell
            eyebrow="Invitation Tools"
            title="Share the experience with elegance"
            description="Quick actions, a QR code, and calendar helpers are grouped together so guests can save the date in one tap."
        >
            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="rounded-[30px] border border-white/12 bg-[color:var(--surface)] p-6 shadow-glow backdrop-blur-2xl"
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        <button type="button" onClick={shareInvitation} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                            <Share2 className="h-4 w-4" /> Share Invitation
                        </button>
                        <button type="button" onClick={copyLink} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Invitation Link
                        </button>
                        <button type="button" onClick={downloadImage} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                            <ImageDown className="h-4 w-4" /> Download as Image
                        </button>
                        <button type="button" onClick={downloadPdf} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                            <Download className="h-4 w-4" /> Download as PDF
                        </button>
                        <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                            <Check className="h-4 w-4" /> Add to Google Calendar
                        </a>
                        <button type="button" onClick={downloadIcs} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                            <Download className="h-4 w-4" /> Add to Apple Calendar
                        </button>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-white/68">
                        These actions are intentionally client-side only, keeping the invitation lightweight while still giving guests useful sharing tools.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="flex flex-col items-center justify-center rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,248,244,0.11),rgba(255,248,244,0.05))] p-6 text-center shadow-glow backdrop-blur-2xl"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/65">
                        <QrCode className="h-4 w-4 text-[color:var(--accent-soft)]" /> QR Code
                    </div>
                    <div className="mt-5 rounded-[24px] bg-white p-4 shadow-2xl">
                        {qrDataUrl ? (
                            <img src={qrDataUrl} alt="QR code for the invitation" className="h-52 w-52 object-contain sm:h-56 sm:w-56" />
                        ) : (
                            <div className="flex h-52 w-52 items-center justify-center text-sm text-[#241518]">Generating QR code...</div>
                        )}
                    </div>
                    <p className="mt-5 max-w-sm text-sm leading-7 text-white/72">
                        Guests can scan this code to open the invitation immediately on mobile.
                    </p>
                </motion.div>
            </div>
        </SectionShell>
    );
}
