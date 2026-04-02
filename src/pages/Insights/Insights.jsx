import MonthComparisonChart from './MonthComparisonChart';
import CategoryProgressBars from './CategoryProgressBars';
import InsightsSummaryCard from './InsightsSummaryCard';
import { Card } from '../../components/ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Insights() {
  return (
    <div className="pb-20 xl:pb-0  animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Insights</h2>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">Analytics and summaries of your spending habits.</p>
      </div>

      <InsightsSummaryCard />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard title="Total Income" amount="$5,670" trend="+12%" isPositive={true} />
        <StatCard title="Total Spent" amount="$1,040" trend="-4%" isPositive={true} />
        <StatCard title="Savings" amount="$4,630" trend="+16%" isPositive={true} />
        <StatCard title="Subscript." amount="$49.98" trend="+2%" isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <MonthComparisonChart />
        </div>
        <div>
          <CategoryProgressBars />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, amount, trend, isPositive }) {
  return (
    <Card className="p-4 flex flex-col justify-between h-[120px]">
      <div className="text-[var(--color-text-secondary)] text-xs font-medium">{title}</div>
      <div>
        <div className="text-xl font-bold tracking-tight mb-1">{amount}</div>
        <div className={`text-xs font-semibold flex items-center ${isPositive ? 'text-[var(--color-income)]' : 'text-[var(--color-expense)]'}`}>
          {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
          {trend}
        </div>
      </div>
    </Card>
  );
}
