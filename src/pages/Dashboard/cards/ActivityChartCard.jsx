import { Card } from '../../../components/ui/Card';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { Clock } from 'lucide-react';

const data = [
  { day: 'Mon', h: 22 },
  { day: 'Tue', h: 35 },
  { day: 'Wed', h: 48 },
  { day: 'Thu', h: 30 },
  { day: 'Fri', h: 20 },
  { day: 'Sat', h: 5 },
  { day: 'Sun', h: 10 },
];

export default function ActivityChartCard() {
  const maxH = Math.max(...data.map(d => d.h));

  return (
    <Card className="p-6 flex flex-col h-full min-h-[220px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[var(--color-text-secondary)] font-medium text-sm mb-1">Activity</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">186h</span>
            <span className="text-xs text-[var(--color-text-tertiary)] flex items-center">
              <Clock size={12} className="mr-1" /> worked this week
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full relative group">
        <div className="absolute top-0 right-[20%] -translate-y-4 -translate-x-1/2 bg-[var(--color-acid)] text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 animate-pulse">
          Peak!
          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--color-acid)]"></div>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <Bar dataKey="h" radius={[4, 4, 4, 4]} barSize={32}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.h === maxH ? 'var(--color-acid)' : '#E5E7EB'} 
                  className="transition-colors duration-300 hover:fill-[var(--color-sage-accent)]"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-2 px-2 text-xs text-[var(--color-text-tertiary)] font-medium font-mono">
        {data.map(d => (
          <span key={d.day}>{d.day.charAt(0)}</span>
        ))}
      </div>
    </Card>
  );
}
