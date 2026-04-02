import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import LoadingScreen from '../LoadingScreen';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated load to demonstrate the skeleton
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="flex h-screen overflow-hidden bg-[var(--color-page)]">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden mb-16 xl:mb-0">
          <TopBar />
          <main className="flex-1 w-full overflow-y-auto px-4 md:px-8 pt-6 pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
