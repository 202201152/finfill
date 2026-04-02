import { Search, ListFilter } from 'lucide-react';
import { useFilterStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export default function TransactionFilters() {
  const { searchQuery, setSearchQuery, category, setCategory, type, setType } = useFilterStore();
  
  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Salary', 'Rent', 'Entertainment', 'Health', 'Freelance'];
  const types = ['All', 'income', 'expense'];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions, merchants..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] focus:border-transparent"
          />
        </div>
        
        {/* Type Filter */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 shrink-0">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors",
                type === t ? "bg-[var(--color-sage)] text-white" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      
      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 text-sm text-gray-500 mr-2 shrink-0 font-medium">
          <ListFilter size={16} /> Categories
        </div>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
              category === c 
                ? "bg-[var(--color-sage)] border-[var(--color-sage)] text-white" 
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
