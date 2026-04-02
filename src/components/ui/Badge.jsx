import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    income: "bg-[#7DAF72]/15 text-[#7DAF72]",
    expense: "bg-red-100 text-red-800",
    outline: "border border-[var(--color-sage)] text-[var(--color-sage)]",
    solid: "bg-[var(--color-sage)] text-white"
  };

  return (
    <span 
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)} 
      {...props}
    >
      {children}
    </span>
  );
}
