import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function Card({ className, children, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "bg-white dark:bg-[#1f2937] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] dark:shadow-none dark:border border-[var(--color-border-color)] text-[var(--color-text-primary)] transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
