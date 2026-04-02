import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useRoleStore, useThemeStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export default function TopBar() {
  const location = useLocation();
  const { role, toggleRole } = useRoleStore();
  const { theme, toggleTheme } = useThemeStore();

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/transactions': return 'Transactions';
      case '/insights': return 'Insights';
      default: return 'Settings';
    }
  };

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-transparent shrink-0">
      <div className="flex items-center gap-3 text-[#7DAF72] dark:text-[#91C388]">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
          {/* F Shape */}
          <path d="M10 4H28V8.5H13L10.5 16H22V20.5H9L6 28H1.5L10 4Z" fill="currentColor" />
          {/* Chart Bars */}
          <rect x="12" y="23" width="3.5" height="5" fill="currentColor" />
          <rect x="18" y="18" width="3.5" height="10" fill="currentColor" />
          <rect x="24" y="13" width="3.5" height="15" fill="currentColor" />
        </svg>
        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">FinFlow</span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">


        {/* Role Switcher Pill */}
        <button
          onClick={toggleRole}
          className="flex items-center bg-white border border-[var(--color-border-color)] rounded-full p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
        >
          <div className={cn(
            "px-4 py-1.5 text-xs font-semibold rounded-full transition-colors flex items-center",
            role === 'Admin' ? "bg-gray-900 text-white" : "text-[var(--color-text-secondary)] hover:text-gray-900"
          )}>
            {role === 'Admin' && <span className="w-3 h-3 rounded-full border border-white/50 mr-1.5"></span>}
            Admin
          </div>
          <div className={cn(
            "px-4 py-1.5 text-xs font-semibold rounded-full transition-colors flex items-center",
            role === 'Viewer' ? "bg-gray-900 text-white" : "text-[var(--color-text-secondary)] hover:text-gray-900"
          )}>
            {role === 'Viewer' && <span className="w-4 h-4 rounded-full bg-white/20 mr-1 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></span>}
            Viewer
          </div>
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
          </button>
          <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <Bell size={20} strokeWidth={2} />
          </button>
          <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <Search size={20} strokeWidth={2} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF7A7A] to-[#FFB75E] shadow-sm ml-2"></div>
        </div>
      </div>
    </header>
  );
}
