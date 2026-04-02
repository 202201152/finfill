import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useRoleStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export default function TopBar() {
  const location = useLocation();
  const { role, toggleRole } = useRoleStore();

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/transactions': return 'Transactions';
      case '/insights': return 'Insights';
      default: return 'Settings';
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-transparent shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold tracking-tight">{getBreadcrumb()}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Role Switcher Pill */}
        <button
          onClick={toggleRole}
          className="flex items-center bg-white border border-[var(--color-border-color)] rounded-full p-1 shadow-sm transition-all"
        >
          <div className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full transition-colors",
            role === 'Viewer' ? "bg-[var(--color-text-primary)] text-white" : "text-[var(--color-text-secondary)]"
          )}>
            Viewer
          </div>
          <div className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full transition-colors",
            role === 'Admin' ? "bg-[var(--color-text-primary)] text-white" : "text-[var(--color-text-secondary)]"
          )}>
            Admin
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-white border border-[var(--color-border-color)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <Search size={18} />
          </button>
          <button className="relative w-9 h-9 rounded-full bg-white border border-[var(--color-border-color)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-sage-accent)] flex items-center justify-center text-white overflow-hidden ml-2 shadow-sm">
             <User size={18} fill="currentColor" className="mt-2 opacity-80" />
          </div>
        </div>
      </div>
    </header>
  );
}
