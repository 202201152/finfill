import { Card } from '../../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Milestones', value: 140, color: 'var(--color-sage)' },
  { name: 'Bonuses', value: 48, color: 'var(--color-sage-accent)' },
  { name: 'More', value: 16, color: '#E5E7EB' },
];

export default function ContractTypeCard() {
  return (
    <Card className="p-6 h-full min-h-[220px] flex flex-col justify-between">
      <h3 className="text-[var(--color-text-secondary)] font-medium text-sm mb-4">Contract Type</h3>
      
      <div className="flex items-center justify-between flex-1">
        <div className="w-24 h-24 relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={45}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-xs font-bold mt-1">86%</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 ml-4 flex-1">
          {data.map((item) => (
            <div key={item.name} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[var(--color-text-secondary)]">{item.name}</span>
              </div>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
