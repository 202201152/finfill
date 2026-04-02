import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-page)]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden mb-16 xl:mb-0">
        <TopBar />
        <main className="flex-1 w-full overflow-y-auto px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
