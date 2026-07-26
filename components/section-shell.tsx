import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionShellProps = {
    eyebrow: string;
    title: string;
    description: string;
    className?: string;
    children: ReactNode;
};

export function SectionShell({ eyebrow, title, description, className, children }: SectionShellProps) {
    return (
        <section className={cn('relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--accent-soft)]/90">
                        {eyebrow}
                    </p>
                    <h2 className="font-serif text-3xl tracking-tight text-[color:var(--text)] sm:text-4xl lg:text-5xl">
                        {title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted-text)] sm:text-base">
                        {description}
                    </p>
                </div>
                {children}
            </div>
        </section>
    );
}
