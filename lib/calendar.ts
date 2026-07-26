import type { InvitationData } from '@/types/invitation';
import { formatCalendarDate } from '@/lib/utils';

export function createGoogleCalendarUrl(event: InvitationData['calendarEvent']) {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        details: event.description,
        location: event.location,
        dates: `${formatCalendarDate(event.start)}/${formatCalendarDate(event.end)}`
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function createIcsContent(event: InvitationData['calendarEvent']) {
    const toIcsDate = (value: string) => formatCalendarDate(value);

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Eman & Zeyad Invitation//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}@invitation`,
        `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
        `DTSTART:${toIcsDate(event.start)}`,
        `DTEND:${toIcsDate(event.end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
}
