export type InvitationData = {
    couple: {
        brideName: string;
        groomName: string;
    };
    invitationSlug: string;
    invitationUrl: string;
    weddingDateLabel: string;
    weddingDateISO: string;
    invitationText: string;
    romanticQuote: string;
    heroQuote: string;
    eventTime: string;
    venue: string;
    venueAddress: string;
    googleMapsUrl: string;
    phoneNumber: string;
    logoLabel: string;
    heroBackgroundImage: string;
    backgroundMusicUrl: string;
    themeColors: {
        background: string;
        backgroundSoft: string;
        surface: string;
        surfaceStrong: string;
        border: string;
        text: string;
        mutedText: string;
        accent: string;
        accentSoft: string;
    };
    storyTimeline: Array<{
        title: string;
        date: string;
        description: string;
    }>;
    galleryImages: Array<{
        src: string;
        alt: string;
    }>;
    quotes: string[];
    calendarEvent: {
        title: string;
        description: string;
        location: string;
        start: string;
        end: string;
    };
};
