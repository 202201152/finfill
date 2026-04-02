import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ isLoading, onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onComplete) onComplete();
      }, 400); // 400ms match visual fade
      return () => clearTimeout(timer);
    } else {
      setIsExiting(false);
      setShouldRender(true);
    }
  }, [isLoading, onComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[var(--color-page)] overflow-hidden transition-all duration-400 ease-in-out pointer-events-none ${
        isExiting ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
      style={{ transitionDuration: '400ms' }}
    >
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-[100px] xl:w-[280px] hidden md:flex flex-col border-r border-[#E5E7EB] dark:border-[#27272a] bg-white dark:bg-[#0f1115] px-6 py-8 skeleton-mount">
          <div className="h-10 w-10 xl:w-32 skeleton-bg skeleton-shimmer rounded-xl mb-12"></div>
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-12 w-full skeleton-bg skeleton-shimmer rounded-xl card-delay-${(i % 5) + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Main Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Bar Skeleton */}
          <div className="h-[73px] md:h-20 border-b border-[#E5E7EB] dark:border-[#27272a] bg-white dark:bg-[#0f1115] flex items-center justify-between px-4 md:px-8 skeleton-mount">
            {/* Search / Nav */}
            <div className="h-10 w-32 md:w-48 skeleton-bg skeleton-shimmer rounded-full"></div>
            {/* Avatars / Actions */}
            <div className="flex gap-4">
              <div className="h-10 w-10 skeleton-bg skeleton-shimmer rounded-full hidden md:block"></div>
              <div className="h-10 w-10 skeleton-bg skeleton-shimmer rounded-full hidden md:block"></div>
              <div className="h-10 w-10 skeleton-bg skeleton-shimmer rounded-full"></div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full overflow-y-auto px-4 md:px-8 pt-6 pb-24 md:pb-32 bg-[var(--color-page)]">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Header Row */}
              <div className="flex justify-between items-end skeleton-mount card-delay-1">
                <div className="h-[46px] w-64 skeleton-bg skeleton-shimmer rounded-xl"></div>
                <div className="h-10 w-32 skeleton-bg skeleton-shimmer rounded-full hidden md:block"></div>
              </div>

              {/* Row 1: 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((delay) => (
                  <div key={delay} className={`bg-white dark:bg-[#15171c] rounded-[16px] p-6 shadow-sm border border-[#E5E7EB] dark:border-[#27272a] skeleton-mount card-delay-${delay}`}>
                    <div className="flex justify-between mb-4">
                      <div className="h-6 w-24 skeleton-bg skeleton-shimmer rounded-md"></div>
                      <div className="h-8 w-8 skeleton-bg skeleton-shimmer rounded-full"></div>
                    </div>
                    <div className="h-10 w-40 skeleton-bg skeleton-shimmer rounded-md mb-4"></div>
                    <div className="h-4 w-32 skeleton-bg skeleton-shimmer rounded-md"></div>
                  </div>
                ))}
              </div>

              {/* Row 2: 3 Cards / Complex */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 skeleton-mount card-delay-4">
                {/* Wide Lavender/Promo Card (Col Span 4) */}
                <div className="lg:col-span-4 bg-[#DDE0F7] dark:bg-[#2d3159] rounded-[16px] p-6 min-h-[300px] flex flex-col justify-end skeleton-shimmer overflow-hidden relative">
                  <div className="h-16 w-3/4 bg-black/5 dark:bg-white/5 rounded-xl mb-4 relative z-10"></div>
                  <div className="h-10 w-1/2 bg-black/5 dark:bg-white/5 rounded-full relative z-10"></div>
                </div>

                {/* Graph Card (Col Span 5) */}
                <div className="lg:col-span-5 bg-white dark:bg-[#15171c] rounded-[16px] p-6 border border-[#E5E7EB] dark:border-[#27272a] flex flex-col justify-between">
                  <div className="h-6 w-32 skeleton-bg skeleton-shimmer rounded-md mb-8"></div>
                  <div className="flex items-end justify-between h-48 gap-2 pb-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((bar, i) => (
                      <div 
                        key={i} 
                        className="w-full skeleton-bg skeleton-shimmer rounded-t-sm"
                        style={{ height: `${30 + Math.random() * 60}%`, animationDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Dual Progress / List Card (Col Span 3) */}
                <div className="lg:col-span-3 bg-white dark:bg-[#15171c] rounded-[16px] p-6 border border-[#E5E7EB] dark:border-[#27272a]">
                  <div className="h-6 w-24 skeleton-bg skeleton-shimmer rounded-md mb-8"></div>
                  <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-3">
                           <div className="h-4 w-16 skeleton-bg skeleton-shimmer rounded-md"></div>
                           <div className="h-4 w-12 skeleton-bg skeleton-shimmer rounded-md"></div>
                        </div>
                        <div className="h-3 w-full border border-[#E5E7EB] dark:border-[#27272a] bg-[var(--color-page)] rounded-full overflow-hidden">
                            <div className="h-full skeleton-bg skeleton-shimmer rounded-full" style={{ width: `${Math.max(40, Math.random() * 90)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
