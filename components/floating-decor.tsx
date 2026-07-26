import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';
import { Flower2, Heart, Sparkles } from 'lucide-react';

type FloatingDecorProps = {
    className?: string;
};

export function FloatingDecor({ className }: FloatingDecorProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
            <div className={cn('absolute left-[8%] top-[15%] text-[color:var(--accent-soft)]/40', shouldReduceMotion ? '' : 'animate-float')}>
                <Flower2 className="h-7 w-7 sm:h-10 sm:w-10" />
            </div>
            <div className={cn('absolute right-[10%] top-[18%] text-[color:var(--accent)]/35', shouldReduceMotion ? '' : 'animate-drift')}>
                <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className={cn('absolute bottom-[20%] left-[12%] text-[color:var(--accent-soft)]/35', shouldReduceMotion ? '' : 'animate-pulseGlow')}>
                <Sparkles className="h-5 w-5 sm:h-7 sm:w-7" />
            </div>
            <div className={cn('absolute bottom-[10%] right-[14%] text-white/20', shouldReduceMotion ? '' : 'animate-float')}>
                <Flower2 className="h-9 w-9 sm:h-12 sm:w-12" />
            </div>
        </div>
    );
}
