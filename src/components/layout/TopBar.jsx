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
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <span>Home Page</span>
        <span>/</span>
        <span className="font-semibold text-gray-900">{getBreadcrumb()}</span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Avatars & Add Manager */}
        <div className="hidden lg:flex items-center pr-4">
          <div className="flex -space-x-2 mr-4">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#4DA1FF] z-30"></div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#FF6EC7] z-20"></div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#A763FF] z-10"></div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-[10px] font-medium z-0">+3</div>
          </div>
          <button className="flex items-center text-sm font-medium text-gray-600 border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors">
            <span className="text-gray-400 font-bold mr-2">+</span> Add Manager
          </button>
        </div>

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
