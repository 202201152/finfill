import { Card } from '../../../components/ui/Card';
import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceDot } from 'recharts';

const data = [
  { day: '10', value: 400 },
  { day: '11', value: 300 },
  { day: '12', value: 550 },
  { day: '13', value: 450 },
  { day: '14', value: 700 }, // Peak
  { day: '15', value: 580 },
  { day: '16', value: 820 }, // Current
];

export default function TotalSpentCard() {
  return (
    <Card className="p-6 h-full min-h-[220px] flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[var(--color-text-secondary)] font-medium text-sm">Total Spent</h3>
        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md">Last 7 days</span>
      </div>
      
      <div className="text-2xl font-bold mb-1">$820.65</div>
      <div className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-2 mb-4">
        <span>10 Wallets</span>
        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
        <span>26 Assets</span>
      </div>
      
      <div className="flex-1 w-full min-h-[100px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-text-secondary)" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
            {/* Highlighted Yellow Dot for peak or current */}
            <ReferenceDot x="16" y={820} r={5} fill="var(--color-acid)" stroke="#fff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
