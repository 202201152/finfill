import { cn } from '../../lib/utils';

export function Button({ className, variant = 'primary', size = 'default', children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[var(--color-sage)] hover:bg-[#6c9962] text-white rounded-xl",
    pill: "bg-[var(--color-text-primary)] hover:bg-black text-white rounded-full",
    outline: "border border-[var(--color-border-color)] bg-white hover:bg-gray-50 text-[var(--color-text-primary)] rounded-xl",
    ghost: "bg-transparent hover:bg-gray-100 text-[var(--color-text-secondary)] rounded-xl",
  };
  
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 px-4 text-sm",
    icon: "h-10 w-10",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
