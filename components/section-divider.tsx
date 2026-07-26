import { motion } from 'framer-motion';

export function SectionDivider() {
    return (
        <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mx-auto my-10 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
    );
}
