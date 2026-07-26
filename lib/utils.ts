export function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export function formatCountdownValue(value: number) {
    return String(value).padStart(2, '0');
}

export function formatCalendarDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
