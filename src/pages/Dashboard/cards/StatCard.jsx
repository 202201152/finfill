import { Card } from '../../../components/ui/Card';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function StatCard({ title, amount, subtitle, trend, type }) {
  const isPositive = trend === 'up';
  
  return (
    <Card className="p-6 flex flex-col justify-between h-32 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">{title}</h3>
        
        {/* Dynamic Icon top right */}
        {type === 'balance' && (
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <DollarSign size={16} />
          </div>
        )}
        {type === 'income' && (
          <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <ArrowUpRight size={18} />
          </div>
        )}
        {type === 'expense' && (
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <ArrowDownRight size={18} />
          </div>
        )}
      </div>
      
      <div>
        <div className={cn(
          "text-3xl font-bold tracking-tight mb-1",
          type === 'income' ? 'text-green-500' : type === 'expense' ? 'text-red-400' : 'text-gray-900 dark:text-gray-100'
        )}>
          {amount}
        </div>
        <div className={cn(
          "text-xs font-medium",
          isPositive ? 'text-green-500' : type === 'expense' ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-secondary)]'
        )}>
          {isPositive && '↗ '}{subtitle}
        </div>
      </div>
    </Card>
  );
}
