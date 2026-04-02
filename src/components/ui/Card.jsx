import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-white rounded-[16px] shadow-[var(--shadow-card)] overflow-hidden", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
