import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, LineChart, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, path: '/' },
  { icon: Receipt, path: '/transactions' },
  { icon: LineChart, path: '/insights' },
  { icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar (1280px+) */}
      <aside className="hidden xl:flex flex-col items-center w-16 bg-white dark:bg-[#0f1115] border-r border-[var(--color-border-color)] py-8 z-10">
        <div className="flex flex-col gap-6 w-full">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Nav (< 1280px) */}
      <nav className="xl:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0f1115] border-t border-[var(--color-border-color)] flex justify-space-around items-center px-6 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between w-full max-w-md mx-auto">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </nav>
    </>
  );
}

function NavItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-colors mx-auto",
          isActive 
            ? "bg-[var(--color-text-primary)] text-white dark:text-[#0f1115]" 
            : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-page)]"
        )
      }
    >
      <Icon size={20} strokeWidth={2.5} />
    </NavLink>
  );
}
