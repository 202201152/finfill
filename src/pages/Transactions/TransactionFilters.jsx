import { Search, ListFilter } from 'lucide-react';
import { useFilterStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export default function TransactionFilters() {
  const { searchQuery, setSearchQuery, category, setCategory, type, setType } = useFilterStore();
  
  const filters = ['All', 'Income', 'Expense', 'Pending', 'Completed'];

  return (
    <div className="flex flex-col md:flex-row flex-wrap xl:flex-nowrap gap-4 w-full mb-2">
      {/* Search Bar */}
      <div className="relative w-full md:w-64 shrink-0 shadow-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] dark:text-white"
        />
      </div>
      
      {/* Pills Container */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map(f => {
          const isActive = type === f.toLowerCase() || (type === 'all' && f === 'All');
          return (
            <button
              key={f}
              onClick={() => setType(f.toLowerCase())}
              className={cn(
                "shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors border shadow-sm",
                isActive 
                  ? "bg-[#91C388] border-[#91C388] text-white" 
                  : "bg-white dark:bg-[#1f2937] border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {f}
            </button>
          )
        })}
      </div>
    </div>
  );
}
